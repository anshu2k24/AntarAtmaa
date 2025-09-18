// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    mineCoordinates: { type: String },
    geoTiffImages: [{
        url: String, // URL to the stored image file
        riskLevel: String // e.g., 'High', 'Medium', 'Low'
    }],
    sensorData: [{
        name: String,
        value: String,
        status: String,
        // You can add more detailed fields here based on your data
    }],
    aiPredictions: [{
        rockfall_probabilities: [Number],
        yolo_detections: [Object],
        fusion_scores: [Number],
        risk_levels: [String]
    }]
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);