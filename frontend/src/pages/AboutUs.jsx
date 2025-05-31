import React, { useState } from "react";

function AboutUs() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  const styles = {
    container: {
      padding: "100px 20px 60px",
      background: "#f7f9fc",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
    },
    heading: {
      fontSize: "2.8rem",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "20px",
      color: "#1f2d5a",
    },
    subheading: {
      fontSize: "1.3rem",
      textAlign: "center",
      color: "#555",
      marginBottom: "40px",
      maxWidth: "750px",
      marginInline: "auto",
    },
    section: {
      maxWidth: "900px",
      margin: "0 auto",
      fontSize: "1.1rem",
      color: "#333",
      lineHeight: "1.8",
    },
    block: {
      marginBottom: "40px",
    },
    button: {
      marginTop: "20px",
      padding: "12px 24px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background 0.3s",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About This Platform</h1>
      <p style={styles.subheading}>
        A one-stop solution crafted to empower students with smart tools,
        real-time feedback, and role-based simulations to help them confidently
        crack interviews.
      </p>

      <div style={styles.section}>
        <div style={styles.block}>
          <h2>🎯 Student-First Mission</h2>
          <p>
            Many students struggle with interview preparation due to a lack of
            guidance, practice, or access to relevant resources. This platform
            was built with one goal: to bridge that gap. By offering AI-powered
            tools and a realistic interview environment, students can now
            prepare smarter, not harder.
          </p>
        </div>

        <div style={styles.block}>
          <h2>🧰 What Students Get</h2>
          <ul>
            <li>✅ Role-specific AI-generated interview questions</li>
            <li>
              ✅ Real-time speech feedback on fluency, clarity & confidence
            </li>
            <li>✅ Resume analysis with actionable suggestions</li>
            <li>✅ Mock interviews — both video-based and text-based</li>
            <li>✅ Practice questions sorted by difficulty & topic</li>
            <li>✅ A safe space to track progress and boost confidence</li>
          </ul>
        </div>

        <div style={styles.block}>
          <h2>🌟 Built by a Student, for Students</h2>
          <p>
            Hi, I’m <strong>Drishti</strong> — the solo developer behind this
            platform. I created this solution after realizing how challenging
            interview prep can be without structured practice and feedback.
            Everything here is designed from a student’s perspective — because I
            am one too.
          </p>
        </div>

        <div style={styles.block}>
          <h2>🛠️ Want to Know the Tech Behind It?</h2>
          <button style={styles.button} onClick={toggleDetails}>
            {showDetails ? "Hide Tech Stack" : "Show Tech Stack"}
          </button>

          {showDetails && (
            <div style={styles.card}>
              <h3>📦 Tech Stack</h3>
              <ul>
                <li>
                  <strong>Frontend:</strong> React, React Router
                </li>
                <li>
                  <strong>Backend:</strong> Node.js, Express.js (ES Modules)
                </li>
                <li>
                  <strong>Database:</strong> MongoDB with Mongoose
                </li>
                <li>
                  <strong>AI Tools:</strong> Hugging Face for questions, Mozilla
                  STT for speech
                </li>
                <li>
                  <strong>Cloud Services:</strong> Cloudinary for video storage
                </li>
                <li>
                  <strong>Authentication:</strong> Firebase or JWT
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
