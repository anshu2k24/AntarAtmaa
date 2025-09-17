import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    registeredAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    corporationIdentificationNumber: {
      type: String,
      trim: true,
    },
    registrationType: {
      type: String,
      enum: [
        'Private Limited Company',
        'Public Corporation',
        'Government Entity',
        'Other',
      ],
    },
    sites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
      },
    ],
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
  },
  { timestamps: true }
);

// ✅ Prevent model recompilation issues in Next.js
export default mongoose.models.Organization ||
  mongoose.model('Organization', organizationSchema);
