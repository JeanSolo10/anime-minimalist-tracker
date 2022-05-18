import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/AllAnimeBySeason.css";

export default function AllAnimeBySeason(props) {
  const { currentSeasonAnimes } = useSelector((state) => state.animes);
  console.log(currentSeasonAnimes);
  return (
    <>
      <div className="all-anime-bs-row">
        <div className="all-anime-bs-header">
          <h2>Spring 2022</h2>
        </div>
        <div className="all-anime-bs-row__posters">
          {currentSeasonAnimes.map((anime) => (
            <div anime={anime} key={anime.mal_id} className="all-anime-bs-card">
              <img
                className="all-anime-bs-row__poster"
                src={anime.images.jpg.image_url}
                alt="anime"
              />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
