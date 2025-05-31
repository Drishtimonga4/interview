import express from "express";
import upload from "../middlewares/upload.js";
import { uploadVideo, getUserVideos } from "../controllers/videoController.js";

const router = express.Router();

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/user/:userId", getUserVideos); 

export default router;
