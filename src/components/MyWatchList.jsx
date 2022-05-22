import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { UserAuth } from "../context/AuthContext";
import "../styles/MyWatchList.css";
import {
  setAnimeSingleViewIndex,
  setSelectedSeason,
} from "../features/animes/animeSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
axios.defaults.baseURL = "/";

export default function MyWatchList() {
  const { username } = useSelector((state) => state.users);
  const [watchingList, setWatchingList] = useState([]);
  const [error, setError] = useState("");
  const [completedList, setCompletedList] = useState([]);
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("Auth Token");
    if (authToken && user) {
      fetchWatchAnimeList();
    }
  }, [user]);

  const fetchWatchAnimeList = async () => {
    const url = `/api/v1/status/${user.uid}`;
    const response = await axios.get(url);
    const allAnimeData = await Promise.all(
      response.data.results.map(async (data, index) => {
        const url = `/api/v1/animes/${data.anime_id}`;
        const response = await axios.get(url);
        const anime = response.data.results[0];
        return {
          id: anime.id,
          name: anime.name,
          image_url: anime.image_url,
          status: data.status,
          index: index,
          season: anime.season,
        };
      })
    );
    const watchList = allAnimeData.filter((anime) => {
      return anime.status.toString().toLowerCase() === "watching";
    });
    const completedList = allAnimeData.filter((anime) => {
      return anime.status.toString().toLowerCase() === "completed";
    });
    setWatchingList(watchList);
    setCompletedList(completedList);
  };

  const handleMarkAsCompleted = async (aid) => {
    const url = `/api/v1/status/${user.uid}/${aid}`;
    try {
      await axios.patch(url, { status: "completed" });
      fetchWatchAnimeList();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteEntry = async (aid) => {
    const url = `/api/v1/status/${user.uid}/${aid}`;
    try {
      await axios.delete(url);
      fetchWatchAnimeList();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAnimeTitleClick = async (id, name, season) => {
    const url = `/api/v1/animes/season/${season}`;
    const response = await axios.get(url);
    let index = 0;
    const data = response.data.results;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
        break;
      }
    }
    dispatch(setAnimeSingleViewIndex(index));
    dispatch(setSelectedSeason(season));
    navigate(`/anime/${id}/${name.toString().replaceAll(" ", "-")}`);
  };

  return (
    <>
      <Navbar setError={setError} />
      {error && <div className="auth-error-message">{error}</div>}
      <div className="watch-list-wrapper">
        <div className="watch-list-title">
          <h2>{`${username}'s Watch List`}</h2>
        </div>
        <div className="watch-list-wrap">
          <h3>Watching</h3>
          <div className="anime-row">
            {watchingList.map((anime, index) => (
              <div key={index} className="entry-row">
                <div className="cover">
                  <img
                    className="cover-image"
                    src={anime.image_url}
                    alt="anime"
                  />
                </div>
                <div className="row-links-btns">
                  <div className="anime-list-title">
                    <p
                      className="anime-list-title"
                      onClick={() =>
                        handleAnimeTitleClick(
                          anime.id,
                          anime.name,
                          anime.season
                        )
                      }
                    >
                      {anime.name}
                    </p>
                  </div>
                  <div className="edit-btns">
                    <button
                      onClick={() => handleMarkAsCompleted(anime.id)}
                      className="mark-completed-btn"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(anime.id)}
                      className="mark-remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="watch-list-wrap">
          <h3>Completed</h3>
          <div className="anime-row">
            {completedList.map((anime, index) => (
              <div key={index} className="entry-row">
                <div className="completed-cover">
                  <img
                    className="cover-image"
                    src={anime.image_url}
                    alt="anime"
                  />
                </div>
                <div className="row-links-btns">
                  <div className="title">
                    <p
                      className="anime-list-title"
                      onClick={() =>
                        handleAnimeTitleClick(
                          anime.id,
                          anime.name,
                          anime.season
                        )
                      }
                    >
                      {anime.name}
                    </p>
                  </div>
                  <div className="edit-btns">
                    <button
                      onClick={() => handleDeleteEntry(anime.id)}
                      className="mark-delete-btn"
                    >
                      Delete Entry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
