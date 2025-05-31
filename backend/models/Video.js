import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoUrl: { type: String, required: true },
  feedback: { type: String, default: "" },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Video", videoSchema);
