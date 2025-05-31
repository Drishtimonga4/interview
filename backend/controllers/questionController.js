import Question from "../models/question.js";
import { generateQuestion } from "../services/huggingfaceService.js";

// GET Questions by Role
export const getQuestionsByRole = async (req, res) => {
  try {
    const { role } = req.params;
    if (!role) {
      return res.status(400).json({ error: "Role is required in the URL" });
    }

    const questions = await Question.find({ role });
    const questionList = questions.map((q) => q.question);

    res.status(200).json({ questions: questionList });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

// POST Generate and Save New Questions (Admin/Recruiter)
export const generateNewQuestion = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res
        .status(400)
        .json({ error: "Role is required in request body" });
    }

    // Call Hugging Face service to generate questions
    const rawText = await generateQuestion(role);
    console.log("AI Raw Response:", rawText);

    // Validate that the response is a non-empty string
    if (!rawText || typeof rawText !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid response from Hugging Face" });
    }

    // Use regex to extract questions from the generated text
    const regex = /\d+\.\s+(.*?)(?=\s*\d+\.|$)/gs;
    const matches = [...rawText.matchAll(regex)];

    const questions = matches
      .map((m) => m[1].trim())
      .filter((q) => q.length > 10);

    if (questions.length < 1) {
      return res
        .status(400)
        .json({ error: "Failed to extract questions from AI response" });
    }

    // Save the questions to the database
    const savedQuestions = await Promise.all(
      questions.map((q) =>
        new Question({ role, question: q, type: "technical" }).save()
      )
    );

    res.status(201).json({ questions: savedQuestions.map((q) => q.question) });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: "Error generating questions" });
  }
};

// POST Preview Questions (No DB Save — Jobseeker, Admin, Recruiter)
export const previewGeneratedQuestions = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res
        .status(400)
        .json({ error: "Role is required in request body" });
    }

    // Call Hugging Face service to generate questions
    const rawText = await generateQuestion(role);
    console.log("AI Preview Response:", rawText);

    // Validate that the response is a non-empty string
    if (!rawText || typeof rawText !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid response from Hugging Face" });
    }

    // Use regex to extract questions from the generated text
    const regex = /\d+\.\s+(.*?)(?=\s*\d+\.|$)/gs;
    const matches = [...rawText.matchAll(regex)];

    const questions = matches
      .map((m) => m[1].trim())
      .filter((q) => q.length > 10);

    if (questions.length < 1) {
      return res
        .status(400)
        .json({ error: "Failed to extract questions from AI response" });
    }

    // Return the preview of questions (no DB save)
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error previewing questions:", error);
    res.status(500).json({ error: "Error generating preview questions" });
  }
};
