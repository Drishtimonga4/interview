import mongoose from "mongoose";

// Define the schema for the text responses
const textResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This will reference the User model, assuming it exists in your app
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview", // Assuming you may have an "Interview" model to group responses by interview session
    required: false,
  },
});

// Create the TextResponse model
const TextResponse = mongoose.model("TextResponse", textResponseSchema);

export default TextResponse;
