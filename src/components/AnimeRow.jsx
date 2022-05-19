import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/AnimeRow.css";
import {
  setCurrenSeasonAnimes,
  setAnimeSingleViewIndex,
  setAnimeInUserWatchList,
} from "../features/animes/animeSlice";
import { useSelector, useDispatch } from "react-redux";

export default function AnimeRow(props) {
  const { title, season } = props;
  //const [currentSeasonAnimes, setcurrentSeasonAnimes] = useState([]);
  const [error, setError] = useState("");

  /* redux */
  const { currentSeasonAnimes } = useSelector((state) => state.animes);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = async () => {
    try {
      const response = await axios.get("api/v1/animes");
      response.data.results.forEach((anime) => {
        dispatch(setAnimeInUserWatchList(anime.id));
      });
      dispatch(setCurrenSeasonAnimes(response.data.results));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="row">
        {error && <div className="error-message">{error}</div>}
        <div className="anime-header">
          <h2>
            {title} - {season}
          </h2>
          <div className="anime-header-view-all">
            <Link
              className="anime-header-view-all-link"
              to={`/seasons/${season.toString().toLowerCase()}`}
            >
              View All
            </Link>
          </div>
        </div>
        <div className="row__posters">
          {currentSeasonAnimes.slice(0, 20).map((anime, index) => (
            <div anime={anime} key={index} className="anime-card">
              <Link
                onClick={() => dispatch(setAnimeSingleViewIndex(index))}
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
