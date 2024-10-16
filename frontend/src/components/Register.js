import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Style.css';  // Importing a stylesheet for styling

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("<http://localhost:5000/register>", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data); // Show success message
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      } else {
        setErrorMessage(data); // Show error message
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <Link to="/login" className="login-link">Already have an account? Login here</Link>
      </div>
    </div>
  );
};

export default Register;