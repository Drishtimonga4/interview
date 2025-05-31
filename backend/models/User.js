import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Hashed
  role: {
    type: String,
    enum: ["jobseeker", "recruiter", "admin"],
    default: "jobseeker",
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
