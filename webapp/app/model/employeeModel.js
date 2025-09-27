import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 

const employeeSchema = new mongoose.Schema({ 
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
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Organization',
    required: true
  },
  linkedSites: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Site'
  }]
}, {
  timestamps: true
});


employeeSchema.pre('save', async function(next) {
  
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);