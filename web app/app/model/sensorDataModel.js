import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
    description: "The ID of the mine site where the data was collected."
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    description: "The time and date the data was recorded."
  },
  temperature: {
    type: Number,
    required: true,
    description: "Ambient temperature in Celsius."
  },
  rainfall: {
    type: Number,
    required: true,
    description: "Rainfall amount in millimeters."
  },
  soil_moisture: {
    type: Number,
    required: true,
    description: "Soil moisture content (e.g., volumetric water content)."
  },
  vib_rms: {
    type: Number,
    required: true,
    description: "Vibration in RMS (Root Mean Square) acceleration."
  },
  porepressure: {
    type: Number,
    required: true,
    description: "Pore pressure in kPa or similar units."
  },
  displacement: {
    type: Number,
    required: true,
    description: "Ground displacement in meters."
  }
}, {
  timestamps: false 
});

export default mongoose.models.SensorData || mongoose.model('SensorData', sensorDataSchema);