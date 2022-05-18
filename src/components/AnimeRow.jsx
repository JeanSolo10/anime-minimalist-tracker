import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/AnimeRow.css";
import { setCurrenSeasonAnimes } from "../features/animes/animeSlice";
import { useSelector, useDispatch } from "react-redux";

export default function AnimeRow(props) {
  const { title, season } = props;
  const [currentSeasonAnimes, setcurrentSeasonAnimes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* redux */
  const animes = useSelector((state) => state.animes.value);
  const dispatch = useDispatch();

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
      dispatch(setCurrenSeasonAnimes(allData));
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
          {currentSeasonAnimes.slice(0, 20).map((anime) => (
            <div anime={anime} key={anime.mal_id} className="anime-card">
              <Link
                to={`/anime/${anime.mal_id}/${anime.title
                  .toString()
                  .replaceAll(" ", "-")}`}
              >
                <img
                  className="row__poster"
                  src={anime.images.jpg.image_url}
                  alt="anime"
                />
              </Link>
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
