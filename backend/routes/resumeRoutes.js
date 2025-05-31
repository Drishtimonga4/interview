import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import Resume from "../models/Resume.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

function extractInfo(text) {
  const emailMatch = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
  const skillsMatch = text.match(/skills[:\s]*(.*)/i);
  const educationMatch = text.match(/education[:\s]*(.*)/i);

  return {
    email: emailMatch ? emailMatch[0] : "",
    skills: skillsMatch
      ? skillsMatch[1].split(/,|\n/).map((s) => s.trim())
      : [],
    education: educationMatch ? educationMatch[1] : "",
  };
}

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    const userId = req.body.userId; // tum frontend se bhejogi

    let textContent = "";
    if (file.mimetype === "application/pdf") {
      const buffer = fs.readFileSync(file.path);
      const parsed = await pdfParse(buffer);
      textContent = parsed.text;
    } else if (file.mimetype.includes("wordprocessingml.document")) {
      const result = await mammoth.extractRawText({ path: file.path });
      textContent = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    const extracted = extractInfo(textContent);

    const newResume = new Resume({
      userId,
      filename: file.originalname,
      text: textContent,
      ...extracted,
    });

    await newResume.save();
    fs.unlinkSync(file.path); // remove file

    res.json({ message: "Resume uploaded and saved", data: newResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Resume upload failed" });
  }
});

export default router;
