import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LevelPractice = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const levels = [
    {
      title: "Beginner",
      description:
        "Perfect for those new to interviewing. Focus on basic questions and building confidence.",
      icon: "👶",
      buttonText: "Start Beginner Practice",
      path: "beginner",
      tips: [
        "Practice common questions like 'Tell me about yourself.'",
        "Focus on clarity and confidence.",
        "Keep answers short and sweet.",
      ],
      difficulty: 1,
    },
    {
      title: "Intermediate",
      description:
        "For those with some experience. Tackle more challenging questions and refine your skills.",
      icon: "🧑‍💼",
      buttonText: "Start Intermediate Practice",
      path: "intermediate",
      tips: [
        "Prepare STAR method answers for behavioral questions.",
        "Practice problem-solving scenarios.",
        "Work on your tone and body language.",
      ],
      difficulty: 2,
    },
    {
      title: "Advanced",
      description:
        "Designed for experienced professionals. Master complex scenarios and leadership questions.",
      icon: "🚀",
      buttonText: "Start Advanced Practice",
      path: "advanced",
      tips: [
        "Demonstrate leadership & strategic thinking.",
        "Prepare to discuss failures and learnings.",
        "Showcase results and impact from previous roles.",
      ],
      difficulty: 3,
    },
  ];

  const getLevelStyle = (level) => {
    const styles = {
      Beginner: {
        backgroundColor: "#e8f5e9", // Light Green
        color: "#388e3c", // Dark Green
      },
      Intermediate: {
        backgroundColor: "#FFF3E0", // Light Orange
        color: "#F57C00", // Dark Orange
      },
      Advanced: {
        backgroundColor: "#FFEBEE", // Light Red
        color: "#D32F2F", // Dark Red
      },
    };

    return styles[level] || {};
  };

  // Difficulty bar color based on level
  const getDifficultyColor = (level) => {
    const colors = {
      1: "#4caf50", // green
      2: "#ff9800", // orange
      3: "#f44336", // red
    };
    return colors[level] || "#ccc";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
        backgroundColor: "#f5f5fa",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100vw",
        margin: "20px 0",
        boxSizing: "border-box",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 1s ease-in",
      }}
    >
      <h1
        style={{
          color: "#343a40",
          marginBottom: "20px",
          fontWeight: "700",
          fontSize: "2.5rem",
          letterSpacing: "1px",
        }}
      >
        Let's Practice Levelwise
      </h1>
      <p
        style={{
          maxWidth: "600px",
          marginBottom: "40px",
          color: "#555",
          fontSize: "1.1rem",
          lineHeight: "1.6",
        }}
      >
        Choose your level below and sharpen your skills with tailored practice
        sessions and expert tips!
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "45px",
          flexWrap: "wrap",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {levels.map((level) => (
          <div
            key={level.title}
            style={{
              backgroundColor: getLevelStyle(level.title).backgroundColor,
              color: getLevelStyle(level.title).color,
              padding: "25px",
              width: "320px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() => navigate(`/level-practice/${level.path}`)}
          >
            <div>
              <div style={{ fontSize: "3.5rem", marginBottom: "15px" }}>
                {level.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.9rem",
                  fontWeight: "bold",
                  color: "#222",
                  marginBottom: "15px",
                }}
              >
                {level.title}
              </h3>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#555",
                  marginBottom: "20px",
                  minHeight: "60px",
                }}
              >
                {level.description}
              </p>

              <div style={{ marginBottom: "20px" }}>
                <strong>Tips to succeed:</strong>
                <ul
                  style={{
                    textAlign: "left",
                    paddingLeft: "20px",
                    marginTop: "10px",
                    color: "#444",
                    fontSize: "0.9rem",
                  }}
                >
                  {level.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Difficulty Indicator */}
              <div
                style={{
                  marginBottom: "20px",
                  height: "10px",
                  backgroundColor: "#ddd",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(level.difficulty / 3) * 100}%`,
                    height: "100%",
                    backgroundColor: getDifficultyColor(level.difficulty),
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>

            <button
              style={{
                backgroundColor: "#ff3c00",
                color: "white",
                padding: "12px 20px",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
                border: "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/level-practice/${level.path}`);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e63600";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ff3c00";
              }}
            >
              {level.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelPractice;
