import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuestion = async (role) => {
  try {
    const prompt = `Generate one technical interview question for the role of ${role}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if available
      messages: [
        {
          role: "system",
          content: "You are an AI interview question generator.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });

    const questionText = response?.choices?.[0]?.message?.content?.trim();

    if (!questionText) {
      throw new Error("Invalid response from OpenAI");
    }

    return questionText;
  } catch (error) {
    console.error("OpenAI API Error:", error?.response?.data || error.message);
    throw new Error("Failed to generate question from OpenAI");
  }
};
