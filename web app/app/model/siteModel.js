import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  linkedEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  businessProofLicense: {
    type: String,
    required: true
  }
  // The 'demTiff' field has been removed.
}, {
  timestamps: true
});

const Site = mongoose.models.Site || mongoose.model('Site', siteSchema);

export default Site;