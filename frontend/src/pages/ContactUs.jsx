import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // success or error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", msg: "Please fill out all fields." });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: "error", msg: "Please enter a valid email address." });
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          msg: data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          msg: data.error || "Something went wrong!",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "Server error. Please try again later.",
      });
    }
  };

  const styles = {
    container: {
      width: "400px",
      margin: "50px auto",
      padding: "30px 20px",
      background: "#f4f6fb",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#007bff",
      marginBottom: "25px",
      fontSize: "2.2rem",
      fontWeight: "700",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1.5px solid #ccc",
      fontSize: "1rem",
      backgroundColor: "white",
      color: "black",
      transition: "border-color 0.3s",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      minHeight: "120px",
      borderRadius: "5px",
      border: "1.5px solid #ccc",
      fontSize: "1rem",
      resize: "vertical",
      backgroundColor: "white",
      color: "black",
      transition: "border-color 0.3s",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    statusMessage: {
      marginTop: "15px",
      padding: "12px",
      borderRadius: "5px",
      fontWeight: "600",
      textAlign: "center",
    },
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    contactDetails: {
      marginTop: "30px",
      fontSize: "1.1rem",
      color: "#444",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Us</h2>
      <p style={{ textAlign: "center", marginBottom: "30px", color: "#555" }}>
        Have questions or feedback? We’d love to hear from you!
      </p>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">
            Name
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="message">
            Message
          </label>
          <textarea
            style={styles.textarea}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
          />
        </div>

        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>

      {status && (
        <div
          style={{
            ...styles.statusMessage,
            ...(status.type === "success" ? styles.success : styles.error),
          }}
        >
          {status.msg}
        </div>
      )}

      <div style={styles.contactDetails}>
        <p>
          <strong>Email:</strong> support@example.com
        </p>
        <p>
          <strong>Phone:</strong> +91-9876543210
        </p>
        <p>
          <strong>Address:</strong> Chitkara University, Punjab
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
