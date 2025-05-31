import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js"; // assuming same file now handles both

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

// Authenticated Route - Get current user
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

// Admin-Only Route
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.send("Welcome Admin!");
});

export default router;
