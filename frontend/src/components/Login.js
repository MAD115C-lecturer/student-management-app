import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Style.css';  // Importing a stylesheet for styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("<http://localhost:5000/login>", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.token); // Handle successful login
        navigate("/"); // Redirect to home or another page
      } else {
        setErrorMessage(data); // Show error message
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/register" className="register-link">Don't have an account? Register here</Link>
      </div>
    </div>
  );
};

export default Login;
