import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
    predictionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prediction",
      required: true,
    },
    level: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sentTo: [String], 
  },
  { timestamps: true }
);

export default mongoose.models.Alert ||
  mongoose.model("Alert", alertSchema);
