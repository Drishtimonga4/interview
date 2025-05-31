import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Footer from "../pages/Footer";
import LevelPractice from "../components/LevelPractice";
import Testimonials from "../components/Testimonials";
import Training from "../components/Training";
import ScheduleInterview from "./ScheduleInterview";

function Home() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const levelPracticeRef = useRef(null);
  const [showLevelPractice, setShowLevelPractice] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (levelPracticeRef.current) {
        const sectionTop = levelPracticeRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setShowLevelPractice(sectionTop < windowHeight * 0.75);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { title: "AI-Powered Questions", icon: "🔥", path: "/interview-questions" },
    { title: "Speech-to-Text Analysis", icon: "🎤", path: "/speech-analysis" },
    { title: "Video Mock Interviews", icon: "📹", path: "/video-recording" },
    { title: "Resume Integration", icon: "📄", path: "/resume-upload" },
    { title: "Performance Reports", icon: "📊", path: "/performance-report" },
    { title: "Text-Based Interview", icon: "💬", path: "/text-interview" },
  ];

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5fa",
        padding: "20px 0",
      }}
    >
      {/* Welcome Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
          padding: "50px 20px",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", color: "#222" }}>
          🚀 Land Your Dream Job with Confidence!
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            color: "#555",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Get ready to land your dream job with <strong>AI-powered</strong>{" "}
          practice,
          <strong> real-time speech analysis</strong>, and
          <strong> interactive mock interviews</strong>. Enhance your skills
          with personalized
          <strong> resume feedback</strong>,{" "}
          <strong> performance reports</strong>, and
          <strong> expert recommendations</strong>.
        </p>

        {/* Image and Button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <img
            src="https://elevenrecruiting.com/wp-content/uploads/2022/01/INBODY-Interview-Preparation-Tips-with-title.png"
            alt="Interview Preparation"
            style={{
              width: "60%",
              maxWidth: "600px",
              height: "auto",
              borderRadius: "10px",
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <button
          onClick={scrollToFeatures}
          style={{
            backgroundColor: "#ff3c00",
            color: "white",
            border: "none",
            padding: "14px 24px",
            fontSize: "1.2rem",
            cursor: "pointer",
            borderRadius: "8px",
            transition: "0.3s",
            marginTop: "15px",
          }}
        >
          Let's Practice
        </button>
      </div>
      <Training />

      {/* Features Section */}
      <div
        ref={featuresRef}
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
          marginTop: "30px",
          paddingTop: "40px",
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "#222", marginBottom: "20px" }}>
          Why Choose Us?
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              style={{
                background: " #dbf4",
                padding: "25px 20px",
                width: "300px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 6px 12px rgba(187, 105, 166, 0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 20px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#666",
                  lineHeight: "1.4",
                }}
              >
                Click to explore this feature and enhance your interview
                preparation.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2>Enterprises Form</h2>
          <form>
            <input type="text" placeholder="Enter your company name" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Level Practice Section */}
      <div
        ref={levelPracticeRef}
        style={{
          opacity: showLevelPractice ? "1" : "0",
          transform: showLevelPractice ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          marginBottom: "20px",
        }}
      >
        <LevelPractice />
        
      </div>

      {/* 👇 Mock Interview Scheduling Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto 50px auto",
          padding: "0 20px",
        }}
      >
        <ScheduleInterview />
      </div>

      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;
