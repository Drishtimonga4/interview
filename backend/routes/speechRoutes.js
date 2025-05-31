import express from "express";
import { analyzeSpeech } from "../controllers/analyzeSpeech.js"; // Corrected import

const router = express.Router();

// POST /api/speech/analyze
router.post("/analyze", analyzeSpeech);

export default router;
