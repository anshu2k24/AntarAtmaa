import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Need to install this library: npm install bcryptjs

const employeeSchema = new mongoose.Schema({ // FIX 1: Use mongoose.Schema
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true,
    enum: ["Mines Manager", "Head of Safety", "Chief Geologist"]
  },
  password: {
    type: String,
    required: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId, // FIX 2: Use mongoose.Schema.Types.ObjectId
    ref: 'Organization',
    required: true
  },
  linkedSites: [{
    type: mongoose.Schema.Types.ObjectId, // FIX 2: Use mongoose.Schema.Types.ObjectId
    ref: 'Site'
  }]
}, {
  timestamps: true
});

// FIX 3: Password Hashing Middleware
employeeSchema.pre('save', async function(next) {
  // Only hash the password if it's new or has been modified
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// FIX 4: Mongoose Model Caching for Next.js
export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);