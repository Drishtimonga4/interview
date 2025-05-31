import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      background: "#f4f6ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },
    box: {
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      padding: "30px",
      maxWidth: "350px",
      width: "90%",
    },
    heading: {
      color: "#1a1a2e",
      marginBottom: "10px",
      fontSize: "22px",
    },
    input: {
      width: "calc(100% - 24px)",
      padding: "12px",
      margin: "10px 0",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      fontSize: "14px",
      background: "#f8f9fa",
      color: "black",
      outline: "none",
    },
    button: {
      width: "fit-content",
      padding: "12px 20px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      margin: "20px auto",
      display: "block",
    },
    errorMessage: {
      color: "red",
      marginBottom: "10px",
    },
    signupText: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#495057",
    },
    link: {
      color: "#007bff",
      fontWeight: "bold",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
          {error && <div style={styles.errorMessage}>{error}</div>}
          <button type="submit" style={styles.button}>
            Signup
          </button>
        </form>
        <p style={styles.signupText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
