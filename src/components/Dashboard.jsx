import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AnimeRow from "./AnimeRow";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");
  const [nextSeason, setNextSeason] = useState("");
  const { currentSeasonAnimes, nextSeasonAnimes } = useSelector(
    (state) => state.animes
  );
  const { username } = useSelector((state) => state.users);

  useEffect(() => {
    const currSeason = getSeason(new Date().getMonth());
    setCurrentSeason(currSeason);
    setNextSeason(getNextseason(currSeason));
  }, []);

  const getSeason = (month) => {
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

  const getNextseason = (monthString) => {
    const nextSeasons = {
      Spring: "Summer",
      Fall: "Winter",
      Winter: "Spring",
      Summer: "Fall",
    };
    return nextSeasons[monthString];
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar setError={setError} />
      {error && <div className="auth-error-message">{error}</div>}
      <AnimeRow
        title={`Current Season`}
        season={currentSeason}
        selectedSeasonAnimes={currentSeasonAnimes}
        desc={"current"}
      />
      <AnimeRow
        title={`Next Season`}
        season={nextSeason}
        selectedSeasonAnimes={nextSeasonAnimes}
        desc={"next"}
      />
    </div>
  );
}
