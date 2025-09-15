import mongoose from 'mongoose'; // Use import for modern JS modules

const organizationSchema = new mongoose.Schema({ // Use mongoose.Schema
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String
  },
  registeredAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  corporationIdentificationNumber: {
    type: String
  },
  registrationType: {
    type: String,
    enum: ["Private Limited Company", "Public Corporation", "Government Entity", "Other"]
  },
  // An array of ObjectIds referencing the 'Site' documents.
  sites: [{
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
    ref: 'Site'
  }],
  // An array of ObjectIds referencing the 'Employee' documents.
  employees: [{
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
    ref: 'Employee'
  }]
}, {
  timestamps: true
});

// Use the mongoose.models object to prevent re-compiling models
export default mongoose.models.Organization || mongoose.model('Organization', organizationSchema);