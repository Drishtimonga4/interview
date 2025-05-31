import { SpeechClient } from "@google-cloud/speech";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ override: true });

console.log("Project ID:", "uplifted-kit-456907-c4");
console.log(
  "GOOGLE_APPLICATION_CREDENTIALS:",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);
console.log(
  "Key File Exists:",
  fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
);

const client = new SpeechClient({
  projectId: "uplifted-kit-456907-c4",
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export const analyzeSpeech = async (req, res) => {
  try {
    const { audioBase64 } = req.body;

    console.log("Received audioBase64 length:", audioBase64?.length);

    if (!audioBase64) {
      return res.status(400).json({ error: "Audio is required." });
    }

    const audio = {
      content: audioBase64,
    };

    const config = {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 16000,
      languageCode: "en-US",
    };

    const request = {
      audio,
      config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join(" ");

    const score = {
      fluency: transcription.split(" ").length > 50 ? 8 : 5,
      clarity:
        transcription.includes("um") || transcription.includes("uh") ? 6 : 9,
      confidence: 8,
    };

    res.status(200).json({ transcription, score });
  } catch (err) {
    console.error("Speech analysis error:", err.stack); // Log full stack trace
    res.status(500).json({ error: `Speech analysis failed: ${err.message}` });
  }
};
