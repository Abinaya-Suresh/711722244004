import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ query, setQuery }) {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar">
      <div className="logo">URL Shortner</div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#register">Register</a></li>
      </ul>

     
    </nav>
  );
}

export default Navbar;

