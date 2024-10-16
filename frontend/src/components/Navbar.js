import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Student Management App</h1>
        <ul className="navLinks">
          <li className="navItem">
          <Link to="/studentlist">Student List</Link>          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="logoutButton" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}