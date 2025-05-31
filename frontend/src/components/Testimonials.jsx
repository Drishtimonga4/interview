import React, { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Rohan Mehta",
    text: "This platform helped me refine my interview skills! The AI-driven questions were incredibly close to real interviews, making me more confident and prepared.",
    highlightColor: "#4CAF50",
  },
  {
    name: "Sarah Kapoor",
    text: "The video recording feature was a game-changer for me. It allowed me to review my responses, fix my mistakes, and improve my body language.",
    highlightColor: "#3F51B5",
  },
  {
    name: "Amit Verma",
    text: "I was struggling with technical interviews, but the structured mock tests here helped me crack my dream job! Highly recommended for job seekers.",
    highlightColor: "#9C27B0",
  },
  {
    name: "Neha Sharma",
    text: "The platform provided detailed feedback on my responses. I improved my confidence, speaking skills, and overall performance significantly.",
    highlightColor: "#FF9800",
  },
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("testimonials");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
    testimonialsContainer: {
      textAlign: "center",
      padding: "50px 20px",
      background: "#f5f5fa",
      opacity: 0,
      transform: "translateY(50px)",
      margintop:"90",
      transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
    },
    testimonialsHeading: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20x",
    },
    testimonialsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    testimonialCard: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    },
    testimonialCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    },
    testimonialText: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "10px",
    },
    testimonialName: {
      fontWeight: "bold",
      color: "#222",
    },
  };

  return (
    <div
      id="testimonials"
      style={{
        ...styles.testimonialsContainer,
        ...(isVisible ? { opacity: 1, transform: "translateY(0)" } : {}),
      }}
    >
      <h2 style={styles.testimonialsHeading}>
        How job seekers are succeeding with our platform
      </h2>
      <div style={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            style={{
              ...styles.testimonialCard,
              borderTop: `4px solid ${testimonial.highlightColor}`,
            }}
            className="testimonial-card"
          >
            <p style={styles.testimonialText}>"{testimonial.text}"</p>
            <h4 style={styles.testimonialName}>{testimonial.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
