import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import Resume from "../models/Resume.js";

// Extract text from PDF
const extractPDFText = async (filePath) => {
  const buffer = await fs.readFile(filePath);
  const data = await pdfParse(buffer);
  return data.text;
};

// Extract text from DOCX
const extractDOCXText = async (filePath) => {
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};

// Upload resume controller
export const uploadResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let extractedText = "";

    // Detect and extract text
    if (file.mimetype === "application/pdf") {
      extractedText = await extractPDFText(file.path);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractDOCXText(file.path);
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Extract details from text
    const lines = extractedText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const name = lines[0] || "Unknown";

    const emailMatch = extractedText.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/
    );
    const skillsMatch = extractedText.match(/(skills|technologies):?\s*(.*)/i);

    const skills = skillsMatch
      ? skillsMatch[2]
          .split(/,|\n|-/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    // Save to DB
    const resume = new Resume({
      name,
      email: emailMatch ? emailMatch[0] : "Not found",
      skills,
      fileUrl: file.path,
    });

    await resume.save();

    res.status(200).json({
      message: "✅ Resume uploaded and parsed successfully",
      resume,
    });

    // Optional: Delete uploaded file after processing
    // await fs.unlink(file.path);
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ error: "❌ Failed to process resume" });
  }
};
