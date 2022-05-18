import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AnimeRow from "./AnimeRow";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");

  useEffect(() => {
    const currSeason = getSeason(new Date().getMonth());
    setCurrentSeason(currSeason);
  });

  const getSeason = (month) => {
    console.log("MONTH", month);
    if (month >= 3 && month <= 5) {
      return "Spring";
    }
    if (month >= 6 && month <= 8) {
      return "Summer";
    }
    if (month >= 9 && month >= 11) {
      return "Fall";
    }
    return "Winter";
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar setError={setError} />
      {error && <div className="error-message">{error}</div>}
      <AnimeRow title={`Current Season`} season={currentSeason} />
    </div>
  );
}
