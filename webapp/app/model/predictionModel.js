import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
    rockfall_probabilities: [Number],
    fusion_scores: [Number],
    risk_levels: [String],
    yolo_detections: [
      {
        class: String,
        confidence: Number,
        bbox: [Number],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Prediction ||
  mongoose.model("Prediction", predictionSchema);
