import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api"; // Axios instance with interceptor
import Swal from "sweetalert2"; //   for better popups

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); // Saves user data

        //   custom popup based on user role
        if (user.role === "admin") {
          Swal.fire({
            title: "Welcome Admin!",
            text: "You have access to the admin dashboard.",
            icon: "success",
            confirmButtonText: "Go to Admin Panel",
          });
        } else if (user.role === "jobseeker") {
          Swal.fire({
            title: "Welcome Fresher!",
            text: "Ready for the next step in your career?",
            icon: "info",
            confirmButtonText: "Go to Dashboard",
          });
        } else if (user.role === "recruiter") {
          Swal.fire({
            title: "Welcome Recruiter!",
            text: "Let's find the best talent for your team.",
            icon: "success",
            confirmButtonText: "Go to Recruitment Dashboard",
          });
        }

        // Navigate to the user's  home page
        navigate("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
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
      position: "relative",
    },
    input: {
      width: "calc(100% - 24px)",
      padding: "12px",
      margin: "10px 0",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      fontSize: "14px",
      color: "black",
      background: "#f8f9fa",
      outline: "none",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "20px",
    },
    signupText: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#495057",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.signupText}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
