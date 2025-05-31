import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const dummyQuestions = {
  beginner: [
    "Tell me about yourself.",
    "Why should we hire you?",
    "What are your strengths?",
  ],
  intermediate: [
    "Describe a challenging project you handled.",
    "How do you prioritize tasks?",
    "Explain Object-Oriented Programming.",
  ],
  advanced: [
    "How would you scale a system to handle 1 million users?",
    "Describe a time you led a team through a critical failure.",
    "Explain CAP theorem with an example.",
  ],
};

const roles = [
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "UX Designer",
  "Data Scientist",
  "DevOps Engineer",
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
  "Machine Learning Engineer",
  "Cloud Architect",
];

function LevelQuestions() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [questions, setQuestions] = useState([]);

  const getLevelStyle = (level) => {
    const styles = {
      beginner: { backgroundColor: "#e8f5e9", color: "#388e3c" },
      intermediate: { backgroundColor: "#FFF3E0", color: "#F57C00" },
      advanced: { backgroundColor: "#FFEBEE", color: "#D32F2F" },
    };
    return styles[level] || {};
  };

  const goToNextLevel = () => {
    const levels = ["beginner", "intermediate", "advanced"];
    const nextLevel = levels[levels.indexOf(level) + 1];
    navigate(nextLevel ? `/level-practice/${nextLevel}` : "/");
  };

  const introText = {
    beginner:
      "Welcome to the Beginner Level! This level will test your fundamental knowledge and understanding. Let's get started with some basic questions!",
    intermediate:
      "Welcome to the Intermediate Level! Time to challenge yourself with some technical and conceptual questions that go beyond the basics.",
    advanced:
      "Welcome to the Advanced Level! Get ready to face tough, in-depth questions that test your problem-solving and leadership skills.",
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    if (role) {
      setQuestions(dummyQuestions[level] || []);
    } else {
      setQuestions([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "1000px",
        margin: "20px auto",
      }}
    >
      <h2 style={{ color: getLevelStyle(level).color, marginBottom: "20px" }}>
        {level.charAt(0).toUpperCase() + level.slice(1)} Level Questions
      </h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "20px",
          backgroundColor: "#f1f1f1",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <p>{introText[level]}</p>
      </div>

      <div style={{ marginBottom: "20px", width: "100%", maxWidth: "300px" }}>
        <label
          htmlFor="role-select"
          style={{ fontSize: "1rem", color: "#343a40", display: "block" }}
        >
          Select a Job Role:
        </label>
        <select
          id="role-select"
          value={selectedRole}
          onChange={handleRoleChange}
          style={{
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            width: "100%",
            fontSize: "16px",
          }}
        >
          <option value="">-- Select Role --</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {questions.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h3 style={{ color: "#343a40", marginBottom: "10px" }}>
            Interview Questions:
          </h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {questions.map((q, index) => (
              <li key={index} style={{ marginBottom: "8px", color: "#495057" }}>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRole && (
        <button
          onClick={goToNextLevel}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            marginTop: "40px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Next Level
        </button>
      )}
    </div>
  );
}

export default LevelQuestions;
