import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Navbar({ user, setUser }) {
    const nav = useNavigate();
    async function handleLogout() {
        try {
          await api.post("/logout");   // tell backend to clear cookie
          setUser(null);               // clear React state
          nav("/");                    // go back to homepage
        } catch (err) {
          console.error("Logout failed", err);
        }
      }
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to={user && ("/dashboard")}>🏋️ GymPro</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
          {!user && (
        <>
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/bmi">BMI Calculator</Link></li>
        </>
      )}
            {user && (
        <>
          <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/stats">Stats</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/trivia">Trivia</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/bmi">BMI Calculator</Link></li>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </>
      )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;