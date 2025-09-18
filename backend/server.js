// backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
require('dotenv').config();

const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 8001;

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

// Create a directory for file uploads if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// ------------------- API Endpoints -------------------

// @route POST /api/signup
// @desc Register user & process Geo-TIFFs with AI model
app.post('/api/signup', async (req, res) => {
    console.log('Received signup POST request');

    const form = new formidable.IncomingForm({
        uploadDir: uploadDir,
        keepExtensions: true,
        multiples: true,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Formidable parsing error:', err);
            return res.status(500).json({ message: 'Error parsing form data.' });
        }
        
        console.log('Formidable successfully parsed data.');
        console.log('Parsed fields:', fields);
        console.log('Parsed files:', files);

        const { fullName, email, password, location, mineCoordinates } = fields;
        const geoTiffFiles = files.geoTiffFiles || [];
        
        const tabularData = JSON.parse(fields.tabular_data[0]);

        if (!fullName || !email || !password || !geoTiffFiles.length) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        try {
            const existingUser = await User.findOne({ email: email[0] });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists with this email.' });
            }

            const geoTiffImages = [];
            const aiPredictions = [];
            
            console.log('Starting AI model processing loop...');
            
            // Process each uploaded Geo-TIFF file
            for (const file of geoTiffFiles) {
                console.log(`Processing file ${file.originalFilename}...`);

                // Create FormData for the AI model API
                const formData = new require('form-data')();
                formData.append('tabular_data', JSON.stringify(tabularData));
                formData.append('file', fs.createReadStream(file.filepath), {
                    filename: file.originalFilename,
                    contentType: file.mimetype,
                });

                try {
                    console.log(`Sending data for file ${file.originalFilename} to AI model...`);
                    const aiResponse = await axios.post('http://localhost:8000/rockfall/predict', formData, {
                        headers: formData.getHeaders(),
                    });

                    aiPredictions.push(aiResponse.data);
                    
                    const riskLevel = aiResponse.data.risk_levels.length > 0 ? aiResponse.data.risk_levels[0] : 'Unknown';
                    
                    geoTiffImages.push({
                        url: `/uploads/${path.basename(file.filepath)}`,
                        riskLevel: riskLevel,
                    });
                    console.log(`AI model responded for file ${file.originalFilename}. Risk level: ${riskLevel}`);

                } catch (aiError) {
                    console.error('Error calling AI model:', aiError.response?.data || aiError.message);
                    return res.status(500).json({ message: 'Error communicating with the AI model.' });
                }
            }

            console.log('All files processed, saving user to database...');
            const newUser = new User({
                fullName: fullName[0],
                email: email[0],
                password: password[0],
                location: location[0],
                mineCoordinates: mineCoordinates[0],
                geoTiffImages: geoTiffImages,
                aiPredictions: aiPredictions,
                sensorData: [
                    { name: "Displacement", value: "2.3mm", status: "online" },
                    { name: "Pressure Monitor", value: "145kPa", status: "online" },
                    { name: "Vibration Detector", value: "8.7Hz", status: "warning" },
                    { name: "Rainfall Sensor", "value": "12.4mm", "status": "online" },
                    { name: "Moisture Monitor", "value": "32%", "status": "offline" },
                    { name: "Temperature Probe", "value": "18.5°C", "status": "online" },
                ],
            });

            await newUser.save();

            console.log('User saved, returning success response...');
            res.status(201).json({ message: 'Account created successfully!' });

        } catch (err) {
            console.error('An error occurred in the signup process:', err);
            res.status(500).json({ message: 'Server error during sign up.' });
        }
    });
});

// ... (rest of your server.js file)

app.post('/api/login', async (req, res) => {
    // ... (This code remains the same as before)
});

app.get('/api/dashboard/:userId', async (req, res) => {
    // ... (This code remains the same as before)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});