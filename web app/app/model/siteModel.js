import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    linkedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    businessProofLicense: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model recompilation issues in Next.js
export default mongoose.models.Site || mongoose.model('Site', siteSchema);
