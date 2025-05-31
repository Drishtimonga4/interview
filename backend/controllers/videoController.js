import cloudinary from "../services/cloudinary.js";
import Video from "../models/Video.js";
import fs from "fs"; //  to remove temp file if needed

export const uploadVideo = async (req, res) => {
  try {
    const userId = req.body.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No video file uploaded." });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
      folder: "interview-videos",
      public_id: `${userId}-${Date.now()}`,
    });

    const videoUrl = result.secure_url;

    // Save metadata to MongoDB
    const newVideo = new Video({
      userId,
      videoUrl,
      uploadedAt: new Date(),
    });

    await newVideo.save();

    //  Delete local temp file
    fs.unlink(file.path, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    res.status(200).json({
      message: "Video uploaded and saved successfully!",
      videoUrl,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Server error uploading video." });
  }
};

export const getUserVideos = async (req, res) => {
  try {
    const userId = req.params.userId;

    const videos = await Video.find({ userId }).sort({ uploadedAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};