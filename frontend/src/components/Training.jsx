import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Training() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("training");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featureData = [
    {
      title: "Boost Your Confidence",
      description:
        "Overcome interview anxiety and project confidence with our proven techniques and practice scenarios.",
      icon: "💪",
      bgColor: "#d0e8f2",
      iconColor: "#1e88e5",
    },
    {
      title: "Accelerate Your Job Search",
      description:
        "Streamline your preparation and land your dream job faster with our efficient and effective training methods.",
      icon: "⚡",
      bgColor: "#fce4ec",
      iconColor: "#d81b60",
    },
    {
      title: "Achieve Your Career Goals",
      description:
        "Develop the skills to impress hiring managers and secure the job you've always wanted.",
      icon: "🎯",
      bgColor: "#e8f5e9",
      iconColor: "#388e3c",
    },
    {
      title: "Become an Interview Expert",
      description:
        "Master the art of interviewing and gain a competitive edge in the job market with our lifelong learning resources.",
      icon: "🏆",
      bgColor: "#ede7f6",
      iconColor: "#5e35b1",
    },
  ];

  const styles = {
    trainingContainer: {
      textAlign: "center",
      padding: "40px 20px",
      backgroundColor: "#f5f5fa",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      boxSizing: "border-box",
      opacity: isVisible ? 1 : 0,
      marginTop: "100px",
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    },
    trainingHeader: {
      marginBottom: "60px",
      maxWidth: "800px",
    },
    trainingHeaderH1: {
      fontSize: "3em",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#343a40",
    },
    trainingHeaderP: {
      fontSize: "1.2em",
      lineHeight: "1.6",
      color: "#495057",
      marginBottom: "40px",
    },
    startPracticing: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "18px 36px",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.2em",
      cursor: "pointer",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    startPracticingHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    trainingFeatures: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    feature: {
      textAlign: "center",
      maxWidth: "280px",
      padding: "30px 20px",
      borderRadius: "12px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      cursor: "default",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      backgroundColor: "#fff",
      userSelect: "none",
    },
    featureHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    },
    featureIcon: (bgColor, iconColor) => ({
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      margin: "0 auto 20px",
      backgroundColor: bgColor,
      color: iconColor,
      fontSize: "3rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      userSelect: "none",
    }),
    featureH3: {
      marginBottom: "12px",
      color: "#212529",
      fontWeight: "600",
      fontSize: "1.3rem",
    },
    featureP: {
      fontSize: "1em",
      lineHeight: "1.5",
      color: "#495057",
    },
  };

  return (
    <div id="training" style={styles.trainingContainer}>
      <header style={styles.trainingHeader}>
        <h1 style={styles.trainingHeaderH1}>Master the Art of Interviewing</h1>
        <p style={styles.trainingHeaderP}>
          Unlock your potential with our comprehensive interview training
          program. Gain the skills and confidence to impress hiring managers and
          land your dream job.
        </p>
        <button
          style={{
            ...styles.startPracticing,
            ...(btnHover ? styles.startPracticingHover : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={() => navigate("/Level-Practice")}
        >
          Start Your Journey
        </button>
      </header>

      <section style={styles.trainingFeatures}>
        {featureData.map((feature, idx) => (
          <div
            key={feature.title}
            style={{
              ...styles.feature,
              ...(hoveredIndex === idx ? styles.featureHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={styles.featureIcon(feature.bgColor, feature.iconColor)}
              aria-label={feature.title + " icon"}
              role="img"
            >
              {feature.icon}
            </div>
            <h3 style={styles.featureH3}>{feature.title}</h3>
            <p style={styles.featureP}>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Training;
