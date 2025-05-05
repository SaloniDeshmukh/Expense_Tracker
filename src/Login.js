import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/actions/authAction";
import { useNavigate , Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) {
            dispatch(loginUser({ username }));
            navigate("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
               <h2 style={styles.heading}>Welcome Back! 👋</h2>
               <p style={styles.subtext}>Enter your details and continue your financial journey.</p>
            <h2 style={styles.heading}>Login</h2>
            <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
            <button onClick={handleLogin} style={styles.button}>Login</button>

            <p style={styles.registerText}>
                New here? 🚀  
                <Link to="/register" style={styles.registerLink}> Create an account</Link> and take control of your expenses!
            </p>
        </div>
    );
};

const styles = {
    container: 
    { 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        height: "50vh", 
        backgroundColor: "#f4f4f4" 
    },

    heading: 
    { 
        fontSize: "30px", 
        marginBottom: "20px", 
        color: "#333" 
    },

    input: 
    { 
        width: "250px", 
        padding: "10px", 
        marginBottom: "10px", 
        borderRadius: "5px", 
        border: "1px solid #ccc", 
        fontSize: "16px" 
    },

    button: 
    { 
        width: "100px", 
        padding: "10px", 
        backgroundColor: "green", 
        color: "white", 
        border: "none", 
        borderRadius: "5px", 
        fontSize: "16px", 
        cursor: "pointer" 
    },
    registerText: {
        marginTop: "15px",
        fontSize: "14px",
        color: "#333",
    },

    registerLink: {
        textDecoration: "none",
        color: "blue",
        fontWeight: "bold",
        marginLeft: "5px"
    },
};


export default Login;
