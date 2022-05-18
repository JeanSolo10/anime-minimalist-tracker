import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/AnimeRow.css";

export default function AnimeRow(props) {
  const { title, season } = props;
  const [currentSeasonAnimes, setcurrentSeasonAnimes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = async () => {
    try {
      let morePagesAvailable = true;
      let currentPage = 0;
      let allData = [];

      while (morePagesAvailable) {
        currentPage++;
        const result = await axios.get(
          `https://api.jikan.moe/v4/seasons/now?page=${currentPage}`
        );
        const hasNextPage = result.data.pagination.has_next_page;
        allData = [...allData, ...result.data.data];
        morePagesAvailable = hasNextPage;
      }
      setcurrentSeasonAnimes(allData);
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
          <p>View All</p>
        </div>
        <div className="row__posters">
          {currentSeasonAnimes.slice(0, 20).map((anime) => (
            <div anime={anime} key={anime.mal_id} className="anime-card">
              <img
                className="row__poster"
                src={anime.images.jpg.image_url}
                alt="anime"
              />
              <p>
                {anime.title.length > 30
                  ? `${anime.title.substring(0, 28)}... `
                  : anime.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
