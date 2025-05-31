import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [resumeURL, setResumeURL] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("uploadedResume");
    if (saved) {
      setResumeURL(saved);
      setMessage("📄 Resume loaded from local storage.");
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file first.");
    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      localStorage.setItem("uploadedResume", base64Data);
      setResumeURL(base64Data);
      setMessage("✅ Resume saved to local storage!");
      setFile(null);
      fileInputRef.current.value = "";
      setUploading(false);
    };

    reader.onerror = () => {
      setMessage("❌ Failed to read file.");
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const styles = {
    resumeContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#F5F5DC",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
      maxWidth: "700px",
      margin: "30px auto",
      fontFamily: "Segoe UI, sans-serif",
    },
    heading: {
      color: "#212529",
      fontSize: "28px",
      fontWeight: "600",
      marginBottom: "10px",
    },
    paragraph: {
      color: "#495057",
      marginBottom: "25px",
      lineHeight: "1.6",
      fontSize: "16px",
    },
    fileInput: {
      marginBottom: "20px",
      padding: "12px",
      border: "1px solid #ced4da",
      borderRadius: "6px",
      fontSize: "15px",
    },
    uploadButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "12px 26px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "20px",
    },
    uploadStatus: {
      marginTop: "10px",
      fontSize: "16px",
      color: "#343a40",
    },
    previewLink: {
      marginTop: "10px",
      textDecoration: "none",
      color: "#007bff",
      fontWeight: "bold",
      fontSize: "16px",
    },
    homeButton: {
      backgroundColor: "#6c757d",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      marginTop: "100px",
      cursor: "pointer",
      alignSelf: "flex-end",
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      maxWidth: "700px",
    },
  };

  return (
    <div style={styles.resumeContainer}>
      <h1 style={styles.heading}>Upload Your Resume</h1>
      <p style={styles.paragraph}>
        Upload your resume in PDF or DOCX format and store it safely in your
        browser. You can preview or download it anytime.
      </p>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={styles.fileInput}
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        style={styles.uploadButton}
      >
        {uploading ? "Saving..." : "Upload"}
      </button>
      {message && <div style={styles.uploadStatus}>{message}</div>}
      {resumeURL && (
        <a
          href={resumeURL}
          download="My_Resume"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.previewLink}
        >
          📄 Preview / Download Resume
        </a>
      )}

      {/* Home Button aligned to the right */}
      <div style={styles.buttonWrapper}>
        <button onClick={() => navigate("/")} style={styles.homeButton}>
          explore more
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;
