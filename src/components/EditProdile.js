import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Profile updated successfully!");
    
    dispatch({ type: "UPDATE_USER", payload: formData });
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate(-1)} />
      <h2 style={styles.heading}>Edit Profile</h2>
      <div style={styles.formContainer}>
        <div style={styles.column}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={styles.input} />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} style={styles.input} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.column}>
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} style={styles.input} />
          <div style={styles.passwordContainer}>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="New Password" value={formData.password} onChange={handleChange} style={styles.input} />
            <span style={styles.showPasswordIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          <div style={styles.passwordContainer}>
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} style={styles.input} />
            <span style={styles.showPasswordIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "👁️" : "🙈"}
            </span>
          </div>
        </div>
      </div>
      <button onClick={handleSave} style={styles.button}>Save</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    backgroundColor: "#f4f4f4",
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
  },
  heading: {
    fontSize: "30px",
    marginBottom: "20px",
    color: "#333",
  },
  formContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "250px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  showPasswordIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "18px",
  },
  button: {
    width: "120px",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "20px",
  },
};

export default EditProfile;
