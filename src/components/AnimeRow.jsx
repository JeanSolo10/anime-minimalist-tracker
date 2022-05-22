import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AnimeRow.css";
import {
  setCurrenSeasonAnimes,
  setAnimeSingleViewIndex,
  setNextSeasonAnimes,
  setSelectedSeason,
} from "../features/animes/animeSlice";
import { useDispatch } from "react-redux";

export default function AnimeRow(props) {
  const { title, season, selectedSeasonAnimes, desc } = props;
  const [error, setError] = useState("");

  /* redux */
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAnime();
  }, [season]);

  const fetchAnime = async () => {
    try {
      const url = `api/v1/animes/season/${season}`;
      if (!season) {
        return;
      }
      const response = await axios.get(url);
      if (season && desc === "current") {
        dispatch(setCurrenSeasonAnimes(response.data.results));
      } else {
        dispatch(setNextSeasonAnimes(response.data.results));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAnimeClick = (index, season) => {
    dispatch(setAnimeSingleViewIndex(index));
    dispatch(setSelectedSeason(season));
  };

  return (
    <>
      <div className="row">
        {error && <div className="auth-error-message">{error}</div>}
        <div className="anime-header">
          <h2>
            {title} - {season}
          </h2>
          <div className="anime-header-view-all">
            <Link
              className="anime-header-view-all-link"
              onClick={() => {
                dispatch(setSelectedSeason(season));
              }}
              to={`/seasons/${season.toString().toLowerCase()}`}
            >
              View All
            </Link>
          </div>
        </div>
        <div className="row__posters">
          {selectedSeasonAnimes &&
            selectedSeasonAnimes.slice(0, 20).map((anime, index) => (
              <div anime={anime} key={index} className="anime-card">
                <Link
                  onClick={() => handleAnimeClick(index, season)}
                  to={`/anime/${anime.id}/${anime.name
                    .toString()
                    .replaceAll(" ", "-")}`}
                >
                  <img
                    className="row__poster"
                    src={anime.image_url}
                    alt="anime"
                  />
                </Link>
                <p>
                  {anime.name.length > 30
                    ? `${anime.name.substring(0, 28)}... `
                    : anime.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
