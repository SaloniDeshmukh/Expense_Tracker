import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export default function FullPage() {
  const sectionStyle = (bg) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    textAlign: "justify",
    backgroundColor: bg ,
    
  });

  const buttonStyle = {
    padding: "12px 30px",
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s, background-color 0.3s",
    margin: "10px",
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: "green",
    color: "white",
  };

  const signupButtonStyle = {
    ...buttonStyle,
    backgroundColor: "blue", 
    color: "white",
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#2c3e50",
  };

  const paragraphStyle = {
    fontSize: "1.25rem",
    maxWidth: "750px",
    marginTop: "1rem",
    color: "#333",
    lineHeight: "1.7",
  };

  const featureListStyle = {
    marginTop: "2rem",
    fontSize: "1.1rem",
    color: "#2c3e50",
    lineHeight: "1.8",
    textAlign: "left",
    maxWidth: "700px",
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
      {/* Home Section */}
      <section style={sectionStyle("rgb(253 228 228)")}>
        <motion.h1
          style={headingStyle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🚀 Take Control of Your Finances
        </motion.h1>
        <motion.p
          style={paragraphStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to <strong style={{ color: "#16a085" }}>Expense Tracker</strong>, your personal finance assistant.
          Easily track your daily expenses, set savings goals, monitor spending patterns, and achieve financial peace of mind.
          Start your journey to smarter money management today!
        </motion.p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Link to="/login">
            <button
              style={loginButtonStyle}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              style={signupButtonStyle}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Sign Up
            </button>
            </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={sectionStyle("#e8f6f3")}>
        <motion.h2
          style={headingStyle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h2>
        <motion.p
          style={paragraphStyle}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          At Expense Tracker, we're passionate about empowering individuals to take control of their financial life.
          With over a decade of experience in the fintech space, our mission is to build simple yet powerful tools that help users budget,
          save, and spend wisely. Whether you're managing your personal budget or saving for your next big goal,
          we’re here to guide every step of the way.
        </motion.p>
      </section>

      {/* Features Section */}
      <section id="features" style={sectionStyle("#fef9e7")}>
        <motion.h2
          style={headingStyle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Features
        </motion.h2>
        <motion.div
          style={featureListStyle}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>💰 <strong>Track Expenses</strong> – Log your income and spending instantly with detailed categories and notes.</p>
          <p>📊 <strong>Visual Insights</strong> – Get interactive graphs and charts that make it easy to understand where your money goes.</p>
          <p>📅 <strong>Budget Planning</strong> – Set monthly budgets and get alerts when you’re close to overspending.</p>
          <p>🔐 <strong>Secure & Private</strong> – Your financial data is encrypted and stored with industry-grade security protocols.</p>
          <p>☁️ <strong>Cloud Sync</strong> – Access your data from any device, anytime, with secure cloud synchronization.</p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={sectionStyle("#f0f3f4")}>
        <motion.h2
          style={headingStyle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Contact Us
        </motion.h2>
        <motion.p
          style={paragraphStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          We're here to help! Whether you have questions, feedback, or technical issues, feel free to reach out.
          <br /><br />
          📧 Email: <a href="mailto:support@expensetracker.com" style={{ color: "#2980b9", textDecoration: "none" }}>support@expensetracker.com</a><br />
          📞 Phone: +1 (123) 456-7890<br />
          🕐 Support Hours: Mon – Fri, 9:00 AM to 5:00 PM (PST)
        </motion.p>
      </section>
    </div>
  );
}
