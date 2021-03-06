import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/AnimeSingleView.css";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import getSeason from "../utils/getSeason";
import getNextSeason from "../utils/getNextSeason";

axios.defaults.baseURL = "/";

export default function AnimeSingleView() {
  const { selectedAnimeIndex, seasonSelected } = useSelector(
    (state) => state.animes
  );

  const currSeason = getSeason(new Date().getMonth() + 1);
  const nextSeason = getNextSeason(currSeason);

  const [error, setError] = useState("");
  const [isInWatchList, setIsInwatchList] = useState("");
  const placeholderImage = require("../images/anime_placeholder.jpg");

  /* redux */
  const [anime, setAnime] = useState(seasonSelected[selectedAnimeIndex]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      fetchIsInWatchList();
    }
    setAnime(seasonSelected[selectedAnimeIndex]);
  }, [user, selectedAnimeIndex]);

  const fetchIsInWatchList = async () => {
    const url = `api/v1/users/${user.uid}/${anime.id}/status`;
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const animeStatus = response.data.results[0].status;
      return setIsInwatchList(animeStatus);
    }
    return setIsInwatchList("");
  };

  const handleButtonClick = async (aid) => {
    const authToken = localStorage.getItem("Auth Token");
    if (!authToken && !user) {
      return setError("You must be logged in to add anime!");
    }
    const url = `/api/v1/status`;
    await axios.post(url, {
      user_id: user.uid,
      anime_id: aid,
      status: "watching",
    });
    setIsInwatchList("watching");
    toast.success("Successfully Added!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
    return;
  };

  return (
    <>
      <Navbar setError={setError} />
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
                    {anime.score !== null
                      ? `${anime.score} / 10`
                      : `not available`}
                  </p>
                </div>
                <div className="anime-episodes">
                  <p>
                    <span className="anime-info-sub-title">EPISODES: </span>
                    {anime.episodes !== null
                      ? `${anime.episodes}`
                      : `not available`}
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
                  <WatchListBtn
                    isInWatchList={isInWatchList}
                    handleButtonClick={handleButtonClick}
                    anime={anime}
                    nextSeason={nextSeason}
                  />
                </div>
              </div>
            </div>
            {error && (
              <div className="anime-error-message">
                {error} <Link to={`/login`}>Login</Link>
              </div>
            )}
            <div className="anime-extra-details-body">
              <div className="anime-synopsis">
                <h3>Sypnosis</h3>
                <p>{anime.synopsis}</p>
              </div>
              <div className="anime-trailer">
                <h3>Trailer</h3>
                <iframe
                  src={anime ? anime.embed_url : undefined}
                  title="anime trailer"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const WatchListBtn = ({
  isInWatchList,
  handleButtonClick,
  anime,
  nextSeason,
}) => {
  if (nextSeason.toLowerCase() === anime.season) {
    return (
      <button disabled={true} className="anime-add-to-list-btn">
        Comming Soon!
      </button>
    );
  }
  if (isInWatchList === "watching") {
    return (
      <button disabled={true} className="anime-watching-status-btn">
        {isInWatchList.charAt(0).toUpperCase() + isInWatchList.slice(1)}
      </button>
    );
  } else if (isInWatchList === "completed") {
    return (
      <button disabled={true} className="anime-completed-status-btn">
        {isInWatchList.charAt(0).toUpperCase() + isInWatchList.slice(1)}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => handleButtonClick(anime.id)}
        className="anime-add-to-list-btn"
      >
        Add to watch list
      </button>
    );
  }
};
