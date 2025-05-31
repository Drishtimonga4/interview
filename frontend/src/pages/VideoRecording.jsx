import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoRecording = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [message, setMessage] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "defaultUserId";

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      let chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(blob);
        setVideoUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera/microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  };

  const uploadVideoToCloudinary = async (videoBlob) => {
    const userId = token;
    const formData = new FormData();
    formData.append("video", videoBlob, "interview-response.webm");
    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:5002/api/videos/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Video uploaded successfully! 📹");
      } else {
        setMessage("❌ Error uploading video: " + data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Error uploading video");
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "interview-response.webm";
    a.click();
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#f4f4f4",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      maxWidth: "700px",
      margin: "40px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      color: "#2c3e50",
      marginBottom: "10px",
      fontSize: "2rem",
    },
    description: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "20px",
    },
    videoBox: {
      width: "100%",
      maxWidth: "600px",
      height: "360px",
      background: "#1e1e2f",
      border: "2px solid #343a40",
      borderRadius: "12px",
      marginBottom: "20px",
      overflow: "hidden",
    },
    video: {
      width: "100%",
      height: "100%",
    },
    button: (bgColor, isHovered) => ({
      backgroundColor: isHovered ? darkenColor(bgColor) : bgColor,
      color: "#fff",
      padding: "12px 24px",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      margin: "10px",
      transition: "background-color 0.3s ease",
    }),
    message: {
      marginTop: "20px",
      fontWeight: "500",
      color: message.includes("Error") ? "#c0392b" : "#27ae60",
    },
  };

  const darkenColor = (color) => {
    switch (color) {
      case "#ff1744":
        return "#d50000";
      case "#4caf50":
        return "#388e3c";
      case "#9e9e9e":
        return "#7e7e7e";
      default:
        return color;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎥 Record a Video</h1>
      <p style={styles.description}>
        Start recording your interview answer. Once done, download or upload it.
      </p>

      <div style={styles.videoBox}>
        <video ref={videoRef} autoPlay playsInline style={styles.video}></video>
      </div>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={styles.button("#ff1744", hoveredButton === "record")}
        onMouseEnter={() => setHoveredButton("record")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {isRecording ? "🛑 Stop Recording" : "▶️ Start Recording"}
      </button>

      {videoUrl && (
        <>
          <h3 style={{ marginTop: "20px" }}>📹 Preview:</h3>
          <video
            src={videoUrl}
            controls
            style={{ width: "100%", marginBottom: "15px" }}
          />

          <div>
            <button
              onClick={handleDownload}
              style={styles.button("#4caf50", hoveredButton === "download")}
              onMouseEnter={() => setHoveredButton("download")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              ⬇️ Download Video
            </button>

            <button
              onClick={() => uploadVideoToCloudinary(videoBlob)}
              style={styles.button("#4caf50", hoveredButton === "upload")}
              onMouseEnter={() => setHoveredButton("upload")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              ☁️Save & Upload
            </button>
          </div>
        </>
      )}

      <button
        onClick={() => navigate("/")}
        style={styles.button("#9e9e9e", hoveredButton === "home")}
        onMouseEnter={() => setHoveredButton("home")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        🏠 Return to Home
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default VideoRecording;
