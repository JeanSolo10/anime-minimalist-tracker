import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AnimeRow from "./AnimeRow";
import { useSelector } from "react-redux";
import getSeason from "../utils/getSeason";
import getNextSeason from "../utils/getNextSeason";
import getLastSeason from "../utils/getLastSeason";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");
  const [nextSeason, setNextSeason] = useState("");
  const [lastSeason, setLastSeason] = useState("");
  const { currentSeasonAnimes, nextSeasonAnimes, lastSeasonAnimes } =
    useSelector((state) => state.animes);
  const { username } = useSelector((state) => state.users);

  useEffect(() => {
    const currSeason = getSeason(new Date().getMonth() + 1);
    setCurrentSeason(currSeason);
    setNextSeason(getNextSeason(currSeason));
    setLastSeason(getLastSeason(currSeason));
  }, []);

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
      <AnimeRow
        title={`Last Season`}
        season={lastSeason}
        selectedSeasonAnimes={lastSeasonAnimes}
        desc={"last"}
      />
    </div>
  );
}
