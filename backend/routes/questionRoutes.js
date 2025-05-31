import express from "express";
import {
  getQuestionsByRole,
  generateNewQuestion,
  previewGeneratedQuestions,
} from "../controllers/questionController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📌 Authenticated users can fetch questions for their role
router.get("/:role", protect, getQuestionsByRole);

// 🔍 Preview questions (for jobseekers, admins, recruiters – no DB save)
router.post(
  "/preview",
  protect,
  authorizeRoles("admin", "recruiter", "jobseeker"),
  previewGeneratedQuestions
);

// 🔒 Generate and save questions (for admins, recruiters only)
router.post(
  "/generate",
  protect,
  authorizeRoles("admin", "recruiter", "jobseeker"),
  generateNewQuestion
);

export default router;
