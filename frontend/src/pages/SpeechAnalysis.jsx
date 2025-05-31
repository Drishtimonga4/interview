import { useState } from "react";
import { useNavigate } from "react-router-dom";  

const SpeechAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate();  

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("Recording...");
    setTimeout(() => {
      setTranscript("Your response will be analyzed here.");
      setAnalysis({
        pace: 150,
        clarity: "Good",
        fillerWords: ["um", "like"],
        sentiment: "Positive",
      });
      setIsRecording(false);
    }, 5000);
  };

  const styles = {
    speechContainer: {
      width: "100%",
      maxWidth: "600px",
      margin: "30px auto",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      color: "#343a40",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#ff5722",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#e64a19",
    },
    analysisResult: {
      marginTop: "20px",
      fontSize: "1rem",
      color: "#4caf50",
      backgroundColor: "#e9ecef",
      padding: "15px",
      borderRadius: "6px",
      textAlign: "left",
    },
    homeButton: {
      marginTop: "30px",
      backgroundColor: "#6c757d",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.speechContainer}>
      <h1 style={styles.heading}>Speech Analysis</h1>
      <p>
        This tool analyzes your speech to provide feedback on your pace,
        clarity, and use of filler words. Click "Start Speaking" to begin
        recording.
      </p>
      <button
        onClick={startRecording}
        disabled={isRecording}
        style={styles.button}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
      >
        {isRecording ? "Recording..." : "Start Speaking"}
      </button>

      {transcript && (
        <div style={styles.analysisResult}>
          <h3>Analysis Result:</h3>
          {analysis ? (
            <div>
              <p>Transcript: {transcript}</p>
              <p>Pace: {analysis.pace} words per minute</p>
              <p>Clarity: {analysis.clarity}</p>
              <p>Filler words: {analysis.fillerWords.join(", ")}</p>
              <p>Sentiment: {analysis.sentiment}</p>
            </div>
          ) : (
            <p>{transcript}</p>
          )}
        </div>
      )}

      {/* ✅ Return to Home Button */}
      <button onClick={() => navigate("/")} style={styles.homeButton}>
        Return to Home
      </button>
    </div>
  );
};

export default SpeechAnalysis;
