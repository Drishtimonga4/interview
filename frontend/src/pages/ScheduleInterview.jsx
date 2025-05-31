import React, { useState } from "react";

const ScheduleInterview = () => {
  const [mentorName, setMentorName] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "30px 40px",
      borderRadius: "15px",
      backgroundColor: "#f5f5fa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#222",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    },
    heading: {
      textAlign: "center",
      marginBottom: "15px",
      fontSize: "2.8rem",
      fontWeight: "600", // changed from 900
      color: "#1a1a1a",
      letterSpacing: "1.2px",
    },
    description: {
      maxWidth: "900px",
      margin: "0 auto 35px auto",
      fontSize: "1.4rem",
      fontWeight: "500", // changed from 600
      color: "#444",
      textAlign: "center",
      lineHeight: "1.6",
    },
    buttonToggle: {
      display: "block",
      margin: "0 auto 25px auto",
      padding: "14px 28px",
      backgroundColor: "#1f7aec",
      color: "white",
      fontWeight: "600", // changed from bold
      fontSize: "1.3rem",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 5px 12px rgba(31, 122, 236, 0.6)",
      transition: "background-color 0.3s ease",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "22px",
      maxWidth: "500px",
      margin: "0 auto 35px auto",
    },
    input: {
      padding: "16px 18px",
      borderRadius: "12px",
      border: "2px solid #1f7aec",
      fontSize: "1.3rem",
      fontWeight: "500", // changed from 600
      outline: "none",
      color: "black",
      backgroundColor: "white",
      transition: "border-color 0.3s ease",
    },
    button: {
      padding: "16px 0",
      backgroundColor: "#28a745",
      color: "white",
      fontWeight: "700", // changed from 900
      fontSize: "1.5rem",
      border: "none",
      borderRadius: "14px",
      cursor: "pointer",
      boxShadow: "0 6px 15px rgba(40, 167, 69, 0.7)",
      transition: "background-color 0.3s ease",
    },
    message: {
      textAlign: "center",
      margin: "15px 0",
      color: "black",
      fontWeight: "600", // changed from 800
      fontSize: "1.4rem",
    },
    list: {
      listStyle: "none",
      padding: "0",
      marginTop: "35px",
      maxWidth: "900px",
      marginLeft: "auto",
      marginRight: "auto",
      fontSize: "1.3rem",
      fontWeight: "500", // changed from 600
      color: "#333",
    },
    listItem: {
      backgroundColor: "white",
      padding: "18px 25px",
      borderRadius: "14px",
      marginBottom: "18px",
      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
      fontWeight: "500", // changed from 700
      color: "#222",
    },
    tips: {
      maxWidth: "500px",
      margin: "20px auto 40px auto",
      fontSize: "1.1rem",
      fontWeight: "500", // changed from 600
      color: "#2c3e50",
      backgroundColor: "#dff0fc",
      padding: "18px 25px",
      borderRadius: "12px",
      lineHeight: "1.5",
      boxShadow: "0 2px 10px rgba(44, 62, 80, 0.15)",
    },
    note: {
      maxWidth: "900px",
      margin: "35px auto 0 auto",
      fontSize: "1.2rem",
      fontWeight: "500", // changed from 600
      fontStyle: "italic",
      color: "#555",
      textAlign: "center",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mentorName || !interviewDate || !timeSlot) {
      setMessage("Please fill in all fields.");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      mentorName,
      interviewDate,
      timeSlot,
    };

    setSchedules((prev) => [...prev, newSchedule]);
    setMessage("Interview scheduled successfully!");

    setMentorName("");
    setInterviewDate("");
    setTimeSlot("");
    setShowForm(false);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Mock Interview Scheduler</h2>

      <p style={styles.description}>
        Use this scheduler to book mock interview sessions with our expert
        mentors. Select a suitable date and time slot that works best for you to
        get personalized interview practice and feedback.
      </p>

      <button
        style={styles.buttonToggle}
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close Form" : "Schedule Interview"}
      </button>

      {showForm && (
        <>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Mentor Name (e.g., drishti monga)"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Time Slot (e.g., 2:00 PM - 3:00 PM)"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Submit Interview Slot
            </button>
          </form>

          <div style={styles.tips}>
            <strong>Tips:</strong>
            <br />
            - Make sure to choose a date at least 2 days in advance.
            <br />
            - Time slots should be 1-hour intervals.
            <br />- Confirm mentor availability after scheduling.
          </div>
        </>
      )}

      {message && <p style={styles.message}>{message}</p>}

      <h3
        style={{
          marginTop: "40px",
          textAlign: "center",
          fontWeight: "500", // changed from 800
          fontSize: "2rem",
        }}
      >
        Scheduled Interviews
      </h3>
      {schedules.length === 0 ? (
        <p
          style={{ textAlign: "center", fontSize: "1.3rem", fontWeight: "500" }}
        >
          No interviews scheduled yet.
        </p>
      ) : (
        <ul style={styles.list}>
          {schedules.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <strong>Mentor:</strong> {item.mentorName} |{" "}
              <strong>Date:</strong>{" "}
              {new Date(item.interviewDate).toLocaleDateString()} |{" "}
              <strong>Time:</strong> {item.timeSlot}
            </li>
          ))}
        </ul>
      )}

      <p style={styles.note}>
        After scheduling, you will receive a confirmation email with further
        details. Please be ready 5 minutes before your scheduled time.
      </p>
    </div>
  );
};

export default ScheduleInterview;
