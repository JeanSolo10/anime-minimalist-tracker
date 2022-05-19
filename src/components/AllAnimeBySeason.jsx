import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/AllAnimeBySeason.css";
import { setAnimeSingleViewIndex } from "../features/animes/animeSlice";
import Navbar from "./Navbar";

export default function AllAnimeBySeason(props) {
  const [error, setError] = useState("");
  const { currentSeasonAnimes } = useSelector((state) => state.animes);
  const dispatch = useDispatch();
  return (
    <>
      <div className="all-anime-bs-row">
        <Navbar setError={setError} />
        {error && <div className="error-message">{error}</div>}
        <div className="all-anime-bs-header">
          <h2>Spring 2022</h2>
        </div>
        <div className="all-anime-bs-row__posters">
          {currentSeasonAnimes.map((anime, index) => (
            <div anime={anime} key={index} className="all-anime-bs-card">
              <Link
                onClick={() => dispatch(setAnimeSingleViewIndex(index))}
                to={`/anime/${anime.id}/${anime.name
                  .toString()
                  .replaceAll(" ", "-")}`}
              >
                <img
                  className="all-anime-bs-row__poster"
                  src={anime.image_url}
                  alt="anime"
                />
              </Link>
              <p>{anime.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
