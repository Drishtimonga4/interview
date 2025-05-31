import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import textInterviewRoutes from "./routes/textInterviewRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import contactRoutes from "./routes/contact.js";
//import scheduleRoutes from "./routes/scheduleRoutes.js";
//import speechRoutes from "./routes/speechRoutes.js"; // Use speechRoutes

//import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend port (Vite)
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "10mb" })); // Handle large audio payloads
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/text-interview", textInterviewRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/contact",contactRoutes);
//app.use("/api/certificate", certificateRoutes);
 
//app.use("/api/speech", speechRoutes); // Mount speech routes

// Error handling middleware for JSON responses
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error: " + err.message });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
