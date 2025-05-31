import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const styles = {
    navbar: {
      width: "100%",
      background: "#02082b",
      padding: "12px 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },
    logoImg: {
      height: "40px",
      marginRight: "12px",
    },
    logoText: {
      fontSize: "1.3em",
      fontWeight: "bold",
      color: "white",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
      listStyle: "none",
      alignItems: "center",
      margin: 0,
    },
    navLink: (isActive, isHovered) => ({
      color: isHovered ? "#75a8df" : "#dacbcb",
      fontSize: "18px",
      textDecoration: "none",
      fontWeight: isActive ? "600" : "500",
      borderBottom: isActive ? "2px solid #75a8df" : "none",
      paddingBottom: "2px",
      transition: "0.3s",
      cursor: "pointer",
    }),
    navButtons: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      justifyContent: "center",
      paddingRight: "40px",
    },
    loginButton: (isHovered) => ({
      color: isHovered ? "#02082b" : "#e9e1e1",
      fontSize: "16px",
      textDecoration: "none",
      fontWeight: "500",
      padding: "6px 14px",
      borderRadius: "5px",
      background: isHovered ? "#e0e5ff" : "transparent",
      transition: "0.3s",
      border: "1px solid #e9e1e1",
    }),
    startFree: (isHovered) => ({
      background: isHovered ? "#5c3f89" : "#222525",
      color: "white",
      padding: "7px 16px",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "0.3s",
    }),
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo} onClick={handleHomeClick}>
        <img
          src="https://c8.alamy.com/comp/W3HXXJ/interview-black-web-stamp-icon-logo-isolated-W3HXXJ.jpg"
          alt="My Interview Practice"
          style={styles.logoImg}
        />
        <span style={styles.logoText}>My Interview Practice</span>
      </Link>

      <ul style={styles.navLinks}>
        <li>
          <Link
            to="/"
            onClick={handleHomeClick}
            style={styles.navLink(
              location.pathname === "/",
              hoveredLink === "home"
            )}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#training"
            onClick={(e) => handleScroll(e, "training")}
            style={styles.navLink(false, hoveredLink === "training")}
            onMouseEnter={() => setHoveredLink("training")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Training
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            onClick={(e) => handleScroll(e, "testimonials")}
            style={styles.navLink(false, hoveredLink === "jobseekers")}
            onMouseEnter={() => setHoveredLink("jobseekers")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Job Seekers
          </a>
        </li>
        <li>
          <Link
            to="/forum"
            style={styles.navLink(
              location.pathname === "/forum",
              hoveredLink === "forum"
            )}
            onMouseEnter={() => setHoveredLink("forum")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Community Forum
          </Link>
        </li>
        <li>
          <Link
            to="/pricing"
            style={styles.navLink(
              location.pathname === "/pricing",
              hoveredLink === "pricing"
            )}
            onMouseEnter={() => setHoveredLink("pricing")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            style={styles.navLink(
              location.pathname === "/about-us",
              hoveredLink === "about"
            )}
            onMouseEnter={() => setHoveredLink("about")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact-us"
            style={styles.navLink(
              location.pathname === "/contact-us",
              hoveredLink === "contact"
            )}
            onMouseEnter={() => setHoveredLink("contact")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Contact Us
          </Link>
        </li>
      </ul>

      <div style={styles.navButtons}>
        <Link
          to="/login"
          style={styles.loginButton(hoveredButton === "login")}
          onMouseEnter={() => setHoveredButton("login")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={styles.startFree(hoveredButton === "signup")}
          onMouseEnter={() => setHoveredButton("signup")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Start for Free
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
