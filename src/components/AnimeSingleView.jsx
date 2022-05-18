import React, { useState, useEffect } from "react";
import { setCurrenSeasonAnimes } from "../features/animes/animeSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../styles/AnimeSingleView.css";

export default function AnimeSingleView() {
  const [anime, setAnime] = useState([]);
  const placeholderImage = require("../images/anime_placeholder.jpg");
  /* redux */
  const { currentSeasonAnimes, selectedAnimeIndex } = useSelector(
    (state) => state.animes
  );

  useEffect(() => {
    setAnime(currentSeasonAnimes[selectedAnimeIndex]);
  }, []);

  const dispatch = useDispatch();

  return (
    <>
      {anime && (
        <div className="anime-wrapper">
          <div className="anime-title">
            <h2>{anime.title}</h2>
          </div>
          <div className="anime-body">
            <div className="anime-main-body">
              <div className="anime-image-container">
                <img
                  className="anime-row__poster"
                  src={
                    anime && anime.images
                      ? anime.images.jpg.image_url
                      : placeholderImage
                  }
                  alt="anime"
                />
              </div>
              <div className="anime-info">
                <div className="anime-score">
                  <p>
                    <span className="anime-info-sub-title">SCORE: </span>
                    {anime.score}
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
                    anime.genres.map((genre, index) => (
                      <span className="anime-genre" key={index}>
                        {(index ? "," : "") + " " + genre.name}
                      </span>
                    ))}
                </div>
                <p></p>
              </div>
            </div>

            <div className="anime-synopsis">
              <h3>Sypnosis</h3>
              <p>{anime.synopsis}</p>
            </div>
            <div className="anime-trailer">
              <iframe
                src={
                  anime && anime.trailer ? anime.trailer.embed_url : undefined
                }
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
