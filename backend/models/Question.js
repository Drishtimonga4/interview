import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["technical", "behavioral", "general"],
    default: "technical",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
