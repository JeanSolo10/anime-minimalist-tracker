import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MyWatchList.css";
axios.defaults.baseURL = "/";

export default function UserAnimeList(props) {
  const [watchingList, setWatchingList] = useState([]);
  const [error, setError] = useState("");
  const [completedList, setCompletedList] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    let componentMounted = true;
    const authToken = localStorage.getItem("Auth Token");
    fetchWatchAnimeList();
    return () => {
      componentMounted = false;
    };
  }, []);

  const fetchWatchAnimeList = async () => {
    const userData = await axios.get(`api/v1/users/user/${username}`);
    const uid = userData.data.results[0].id;
    const url = `/api/v1/status/${uid}`;
    const response = await axios.get(url);
    const allAnimeData = await Promise.all(
      response.data.results.map(async (data) => {
        const url = `/api/v1/animes/${data.anime_id}`;
        const response = await axios.get(url);
        const anime = response.data.results[0];
        return {
          id: anime.id,
          name: anime.name,
          image_url: anime.image_url,
          status: data.status,
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
  return (
    <>
      <div className="watch-list-wrapper">
        <Navbar setError={setError} />
        {error && <div className="error-message">{error}</div>}
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
                  <div className="title">
                    <a
                      href={`/anime/${anime.id}/${anime.name
                        .toString()
                        .replaceAll(" ", "-")}`}
                    >
                      {anime.name}
                    </a>
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
                    <a
                      href={`/anime/${anime.id}/${anime.name
                        .toString()
                        .replaceAll(" ", "-")}`}
                    >
                      {anime.name}
                    </a>
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
