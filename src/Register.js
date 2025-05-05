import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const existingUsers = new Set(JSON.parse(localStorage.getItem("users")) || []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { username, email, phoneNumber, password, confirmPassword } = formData;

        if (existingUsers.has(username)) {
            alert("Username already exists. Choose a different one.");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (!/^\d{10}$/.test(phoneNumber)) {
            alert("Phone number must be exactly 10 digits.");
            return false;
        }

        if (!/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password)) {
            alert(
                "Password must be at least 8 characters long, contain at least one uppercase letter, and one special character."
            );
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }

        return true;
    };

   
    const handleRegister = () => {
        if (Object.values(formData).some((field) => field === "")) {
            setSuccessMessage(""); // Clear success message if any
            return;
        }
    
        if (!validateForm()) {  // ✅ Now validation will work!
            return;
        }
    
        // Retrieve existing users as an array (fix the Set issue)
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
        // Check if username already exists
        if (existingUsers.some(user => user.username === formData.username)) {
            alert("Username already exists. Choose a different one.");
            return;
        }
    
        // Store all user information
        const newUser = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password, 
        };
    
        // Add new user to the list and save to localStorage
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
    
        setSuccessMessage("🎉 Registration successful! Redirecting to login...");
    
        setTimeout(() => {
            setSuccessMessage("");
            navigate("/login");
        }, 3000);
    };
    

    return (
        <div style={styles.container}>
            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
            <h2 style={styles.heading}>Register</h2>
            <div style={styles.formContainer}>
                <div style={styles.column}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <div style={styles.passwordContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <span
                            style={styles.showPasswordIcon}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>
                </div>
                <div style={styles.column}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <div style={styles.passwordContainer}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <span
                            style={styles.showPasswordIcon}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "👁️" : "🙈"}
                        </span>
                    </div>
                </div>
            </div>
            <button onClick={handleRegister} style={styles.button}>
                Register
            </button>
            <p style={styles.loginText}>
                Already have an account?{" "}
                <span style={styles.loginLink} onClick={() => navigate("/login")}>
                    Log in here
                </span>
            </p>
        </div>
    );
};

// CSS styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        backgroundColor: "#f4f4f4",
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
        backgroundColor: "blue",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
        marginTop: "20px",
    },
    loginText: {
        marginTop: "15px",
        fontSize: "14px",
        color: "#555",
    },
    loginLink: {
        color: "#007bff",
        fontWeight: "bold",
        cursor: "pointer",
        textDecoration: "underline",
    },
    successMessage: {
        backgroundColor: "#d4edda",
        color: "#155724",
        padding: "10px",
        borderRadius: "5px",
        textAlign: "center",
        width: "80%",
        marginBottom: "15px",
        fontSize: "16px",
        border: "1px solid #c3e6cb",
    }
    
};

export default Register;
