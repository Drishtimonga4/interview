import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  text: String,
  filename: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Resume", resumeSchema);
