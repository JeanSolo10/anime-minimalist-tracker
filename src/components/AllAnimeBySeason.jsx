import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/AllAnimeBySeason.css";
import { setAnimeSingleViewIndex } from "../features/animes/animeSlice";

export default function AllAnimeBySeason(props) {
  const { currentSeasonAnimes } = useSelector((state) => state.animes);
  const dispatch = useDispatch();
  return (
    <>
      <div className="all-anime-bs-row">
        <div className="all-anime-bs-header">
          <h2>Spring 2022</h2>
        </div>
        <div className="all-anime-bs-row__posters">
          {currentSeasonAnimes.map((anime, index) => (
            <div anime={anime} key={anime.mal_id} className="all-anime-bs-card">
              <Link
                onClick={() => dispatch(setAnimeSingleViewIndex(index))}
                to={`/anime/${anime.mal_id}/${anime.title
                  .toString()
                  .replaceAll(" ", "-")}`}
              >
                <img
                  className="all-anime-bs-row__poster"
                  src={anime.images.jpg.image_url}
                  alt="anime"
                />
              </Link>
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
