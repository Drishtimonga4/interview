import { Link } from "react-router-dom";

const Dashboard = () => {
  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
      background: "#f4f6ff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      color: "#1a1a2e",
      fontSize: "24px",
      marginBottom: "20px",
    },
    linksContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      background: "#007bff",
      color: "white",
      padding: "15px 25px",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "background 0.3s",
      display: "inline-block",
      textAlign: "center",
      fontSize: "16px",
    },
    cardHover: {
      background: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Your Dashboard</h2>
      <div style={styles.linksContainer}>
        <Link to="/interview-questions" style={styles.card}>
          Interview Questions
        </Link>
        <Link to="/video-recording" style={styles.card}>
          Video Recording
        </Link>
        <Link to="/chat-interview" style={styles.card}>
          Chat-Based Interview
        </Link>
        <Link to="/resume-upload" style={styles.card}>
          Resume Upload
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
