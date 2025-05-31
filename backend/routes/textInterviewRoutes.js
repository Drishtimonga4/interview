import express from "express";
import {
  saveResponse,
  getResponses,
} from "../controllers/textInterviewController.js";

const router = express.Router();

// Route to save a user's response
router.post("/save", saveResponse);

// Route to get all responses for a specific user
// Updated to handle a query parameter for filtering by interview session if needed
router.get("/:userId", getResponses);

//  Add route to get responses by a specific interview session (optional enhancement)
router.get("/:userId/interview/:interviewId", getResponses);

export default router;
