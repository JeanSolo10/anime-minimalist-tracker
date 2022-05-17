import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [error, setError] = useState("");

  return (
    <div className="dashboard-wrapper">
      <Navbar setError={setError} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
