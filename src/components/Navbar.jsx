import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const { user, logout } = UserAuth();
  const { setError } = props;
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      localStorage.removeItem("Auth Token");
      navigate("/login");
    } catch (error) {
      setError("Failed to logout");
    }
  };

  return (
    <>
      <nav className="nav-main-grid">
        <p className="nav-title">Anime Tracker</p>
        {!user && (
          <div className="nav-login-link">
            <Link className="nav-login-link-text" to="/login">
              Login
            </Link>
          </div>
        )}
        {user && (
          <div onClick={handleLogout} className="nav-logout-link">
            Logout
          </div>
        )}
      </nav>
    </>
  );
}
