import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res
      .status(201)
      .json({ message: "Your message has been received. Thank you!" });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
