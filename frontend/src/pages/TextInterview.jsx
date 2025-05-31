import { useState, useEffect } from "react";
import axios from "axios";

const TextInterview = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewId, setInterviewId] = useState(""); //   track the interview session

  const userId = localStorage.getItem("userId"); // Assume it's stored on login

  
  const predefinedQuestions = [
    "Tell me about yourself.",
    "Why do you want to work with us?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "Describe a challenging situation you faced at work and how you handled it.",
    "What is your biggest accomplishment?",
    "How do you handle pressure or stressful situations?",
    "Tell me about a time when you worked in a team.",
    "What are your salary expectations?",
  ];

  useEffect(() => {
    // Initialize   first question and generate interviewId  
    if (predefinedQuestions.length > 0) {
      setMessages([{ text: predefinedQuestions[0], sender: "interviewer" }]);
      if (!interviewId) {
        // Generate a unique interview id  
        setInterviewId(`interview-${new Date().getTime()}`);
      }
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Store the response to backend
    try {
      await axios.post("/api/text-interview/save", {
        userId,
        question: predefinedQuestions[currentQuestionIndex],
        response: input,
        interviewId, // Pass interviewId to  the response with this session
      });
      console.log("Response saved successfully.");
    } catch (err) {
      console.error("Failed to save response:", err);
    }

    setInput("");
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < predefinedQuestions.length) {
      setTimeout(() => {
        setMessages([
          ...newMessages,
          { text: predefinedQuestions[nextIndex], sender: "interviewer" },
        ]);
        setCurrentQuestionIndex(nextIndex);
      }, 500);
    } else {
      setMessages([
        ...newMessages,
        {
          text: "Great job! You've completed the interview 🎉",
          sender: "interviewer",
        },
      ]);
    }
  };
  

  const styles = {
    container: {
      width: "100%",
      maxWidth: "800px",
      margin: "30px auto",
      padding: "40px",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "sans-serif",
    },
    heading: {
      color: "#343a40",
      marginBottom: "10px",
    },
    paragraph: {
      color: "#495057",
      marginBottom: "20px",
      lineHeight: "1.6",
    },
    chatBox: {
      backgroundColor: "#f0f0f5",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      height: "300px",
      overflowY: "auto",
    },
    chatMessage: {
      marginBottom: "10px",
      padding: "10px 15px",
      borderRadius: "5px",
      maxWidth: "70%",
    },
    userMessage: {
      backgroundColor: "#007bff",
      color: "white",
      textAlign: "right",
      alignSelf: "flex-end",
      marginLeft: "auto",
    },
    interviewerMessage: {
      backgroundColor: "#e9ecef",
      color: "#343a40",
      textAlign: "left",
      alignSelf: "flex-start",
      marginRight: "auto",
    },
    inputArea: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      flexGrow: 1,
      padding: "12px",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      marginRight: "10px",
    },
    button: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#218838",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Text-Based Interview Practice</h1>
      <p style={styles.paragraph}>
        Welcome to the text-based interview simulation! This tool allows you to
        practice answering interview questions in a text-based format, helping
        you refine your written communication skills and prepare for text-based
        interviews, which are commonly used in remote hiring processes.
      </p>
      <div
        style={{ ...styles.chatBox, display: "flex", flexDirection: "column" }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              ...styles.chatMessage,
              ...(msg.sender === "user"
                ? styles.userMessage
                : styles.interviewerMessage),
            }}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          style={styles.input}
        />
        <button
          onClick={sendMessage}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TextInterview;
