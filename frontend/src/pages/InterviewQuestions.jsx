import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InterviewQuestions = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const fetchQuestions = async () => {
    if (!selectedRole) {
      alert("Please select a job role.");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5002/api/questions/${encodeURIComponent(
          selectedRole
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Error: ${res.status} - ${err}`);
      }

      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Failed to fetch questions:", error.message);
      alert("Failed to fetch questions. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "40px",
        padding: "20px",
        maxWidth: "1000px",
        margin: "20px auto",
        backgroundColor: "",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Left side: content */}
      <div
        style={{
          flex: 1,
          minWidth: "320px",
          maxWidth: "600px",
          textAlign: "left",
          color: "#343a40",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Practice Interview Questions</h1>
        <p style={{ marginBottom: "20px" }}>
          Prepare for your interview by practicing questions tailored to your
          desired role.
        </p>

        <h2 style={{ marginBottom: "20px" }}>Select a Job Role</h2>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            width: "100%",
            fontSize: "16px",
          }}
        >
          <option value="">-- Select --</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button
          onClick={fetchQuestions}
          disabled={isLoading}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {isLoading ? "Loading..." : "Get Questions"}
        </button>

        {isLoading && (
          <div style={{ color: "#6c757d", marginBottom: "20px" }}>
            Loading...
          </div>
        )}

        {questions.length > 0 && (
          <div>
            <h3 style={{ marginBottom: "10px" }}>Interview Questions:</h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                color: "#495057",
              }}
            >
              {questions.map((question, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#F5F5DC",
            color: "black",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          next
        </button>
      </div>

      {/* Right side: image */}
      <div
        style={{
          flex: 1,
          maxWidth: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://techdose.co.in/wp-content/uploads/2024/07/Interview-dose.png"
          alt="Interview Questions"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
            opacity: 0,
            animation: "fadeIn 2s forwards",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Fade-in keyframes */}
      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          div[style*="flex-direction: row"] {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default InterviewQuestions;
