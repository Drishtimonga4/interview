import React from "react";

function Footer() {
  const styles = {
    footer: {
      background: "#1a1a2e",
      color: "white",
      padding: "20px 0",
      textAlign: "center",
      width: "100vw",
      position: "relative",
      bottom: 0,
      left: 0,
    },
    linksContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "15px",
      width: "100%",
    },
    link: {
      color: "#ff7b00",
      textDecoration: "none",
      fontSize: "17px",
      transition: "0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    linkHover: {
      textDecoration: "underline",
      color: "#ff3c00",
    },
    socialContainer: {
      display: "flex",
      gap: "15px",
      justifyContent: "center",
      width: "100%",
      marginTop: "10px",
    },
    icon: {
      width: "20px",
      height: "20px",
    },
    info: {
      fontSize: "13px",
      opacity: 0.8,
      maxWidth: "650px",
      margin: "0 auto",
      lineHeight: "1.7",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.linksContainer}>
        <a href="/blog" style={styles.link}>
          <i className="fas fa-blog"></i> Blog
        </a>
        <a href="/contact" style={styles.link}>
          <i className="fas fa-envelope"></i> Contact Us
        </a>
        <a href="/faqs" style={styles.link}>
          <i className="fas fa-question-circle"></i> FAQs
        </a>
        <a href="/support" style={styles.link}>
          <i className="fas fa-video"></i> Support & How-To Videos
        </a>
        <a href="/professions" style={styles.link}>
          <i className="fas fa-briefcase"></i> Popular Professions
        </a>
        <a href="/terms" style={styles.link}>
          <i className="fas fa-file-contract"></i> Terms
        </a>
        <a href="/privacy" style={styles.link}>
          <i className="fas fa-user-shield"></i> Privacy
        </a>
      </div>

      <div style={styles.socialContainer}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          <i className="fab fa-facebook" style={styles.icon}></i> Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          <i className="fab fa-instagram" style={styles.icon}></i> Instagram
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          <i className="fab fa-linkedin" style={styles.icon}></i> LinkedIn
        </a>
      </div>

      <div style={styles.info}>
        <p>© 2025 My Interview Practice. All Rights Reserved @Drishti Monga</p>
        <p>1152 1st Avenue #2030, New York, NY 10028</p>
      </div>
    </footer>
  );
}

export default Footer;
