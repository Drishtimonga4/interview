import TextResponse from "../models/TextResponse.js";

// Save a user's response
export const saveResponse = async (req, res) => {
  const { userId, question, response, interviewId } = req.body;

  if (!userId || !question || !response) {
    return res
      .status(400)
      .json({ message: "UserId, question, and response are required." });
  }

  try {
    const saved = await TextResponse.create({
      userId,
      question,
      response,
      interviewId,
    });
    res.status(201).json({ message: "Response saved successfully!", saved });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Server error while saving response." });
  }
};

// Get responses for a specific user, optionally filtered by interview session
export const getResponses = async (req, res) => {
  const { userId } = req.params;
  const { interviewId } = req.query; // Use query parameters for optional filtering

  try {
    let responses;
    if (interviewId) {
      // Filter by both userId and interviewId if interviewId is provided
      responses = await TextResponse.find({ userId, interviewId });
    } else {
      // Get all responses for the specific user
      responses = await TextResponse.find({ userId });
    }

    if (!responses.length) {
      return res
        .status(404)
        .json({ message: "No responses found for this user." });
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res
      .status(500)
      .json({ message: "Error fetching responses from the server." });
  }
};
