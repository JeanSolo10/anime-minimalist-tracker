import React, { useState, useEffect } from "react";
import {
  setCurrenSeasonAnimes,
  updateAnimeInUserWatchList,
} from "../features/animes/animeSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../styles/AnimeSingleView.css";
import { UserAuth } from "../context/AuthContext";

export default function AnimeSingleView() {
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState("");
  const placeholderImage = require("../images/anime_placeholder.jpg");
  /* redux */
  const { currentSeasonAnimes, selectedAnimeIndex, animeInUserWatchList } =
    useSelector((state) => state.animes);
  const { user } = UserAuth();

  useEffect(() => {
    setAnime(currentSeasonAnimes[selectedAnimeIndex]);
  }, []);

  const dispatch = useDispatch();

  const handleButtonClick = (action, id) => {
    const authToken = localStorage.getItem("Auth Token");
    if (!authToken && !user) {
      return setError("You must be logged in to save anime!");
    }
    dispatch(updateAnimeInUserWatchList(id));
  };

  return (
    <>
      {anime && (
        <div className="anime-wrapper">
          <div className="anime-title">
            <h2>{anime.name}</h2>
          </div>
          <div className="anime-body">
            <div className="anime-main-body">
              <div className="anime-image-container">
                <img
                  className="anime-row__poster"
                  src={anime ? anime.image_url : placeholderImage}
                  alt="anime"
                />
              </div>
              <div className="anime-info">
                <div className="anime-score">
                  <p>
                    <span className="anime-info-sub-title">SCORE: </span>
                    {`${anime.score} / 10`}
                  </p>
                </div>
                <div className="anime-episodes">
                  <p>
                    <span className="anime-info-sub-title">EPISODES: </span>
                    {anime.episodes}
                  </p>
                </div>
                <div className="anime-genres">
                  <span className="anime-info-sub-title">GENRES: </span>
                  {anime &&
                    anime.genres &&
                    anime.genres.genreTypes.map((genre, index) => (
                      <span className="anime-genre" key={index}>
                        {(index ? "," : "") + " " + genre}
                      </span>
                    ))}
                </div>
                <div className="anime-add-to-list-container">
                  {animeInUserWatchList[anime.id] ? (
                    <button
                      onClick={() => handleButtonClick("remove", anime.id)}
                      className="anime-remove-from-list-btn"
                    >
                      Remove from list
                    </button>
                  ) : (
                    <button
                      onClick={() => handleButtonClick("add", anime.id)}
                      className="anime-add-to-list-btn"
                    >
                      Add to watch list
                    </button>
                  )}
                </div>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="anime-synopsis">
              <h3>Sypnosis</h3>
              <p>{anime.synopsis}</p>
            </div>
            <div className="anime-trailer">
              <iframe
                src={anime ? anime.embed_url : undefined}
                title="anime trailer"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
