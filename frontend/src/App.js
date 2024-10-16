// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Manage whether the user is logged in

  const handleLogin = () => setIsAuthenticated(true);  // Handles login
  const handleLogout = () => setIsAuthenticated(false);  // Handles logout

  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} /> 
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;