import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <nav style={styles.navbar}>
      <RouterLink to="/" style={styles.link}>Home</RouterLink>
      <ScrollLink to="about" smooth={true} duration={500} style={styles.link}>
        About
      </ScrollLink>
      <ScrollLink to="features" smooth={true} duration={500} style={styles.link}>
        Features
      </ScrollLink>
      <ScrollLink to="contact" smooth={true} duration={500} style={styles.link}>
        Contact Us
      </ScrollLink>

      {!isAuthenticated ? (
        <RouterLink to="/login" style={styles.link}>Login</RouterLink>
      ) : (
        <>
          <RouterLink to="/edit-profile" style={styles.link}>Edit Profile</RouterLink>
          <button onClick={() => dispatch(logoutUser())} style={styles.button}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    background: "#666362",
    padding: "10px",
    height: "60px",
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "20px",
    padding: "20px",
    cursor: "pointer",
  },
  button: {
    padding: "8px 16px",
    marginLeft: "auto",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    fontWeight: "bold",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default Navbar;
