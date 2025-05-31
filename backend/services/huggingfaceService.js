import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const generateQuestion = async (role) => {
  const prompt = `Generate 5 unique technical interview questions for the role of ${role}. Format them as a numbered list.`;

  try {
    // Make a request to the Hugging Face API with the input prompt
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",

      {
        inputs: prompt,
        options: {
          wait_for_model: true, // Ensure model is loaded even if cold
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log the full response to debug
    console.log("Hugging Face API Response:", response.data);

    // Extract the generated text from the response based on its structure
    const data = response.data;

    let generatedText = "";

    if (Array.isArray(data)) {
      generatedText = data[0]?.generated_text || data[0]?.output || "";
    } else if (typeof data === "object") {
      generatedText = data.generated_text || data.output || "";
    } else {
      generatedText = data.toString();
    }

    // Check if the response contains valid text
    if (!generatedText || generatedText.trim().length === 0) {
      throw new Error("Empty response from Hugging Face model");
    }

    // Return the generated text
    return generatedText;
  } catch (error) {
    // Log detailed error information for debugging
    console.error(
      "Hugging Face API Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate questions using Hugging Face");
  }
};
