const axios = require("axios");
const { setTimeout } = require("timers/promises");

class AnimeDataFetcher {
  constructor() {
    this.animeIdsInDb = new Set();
  }

  async fetchCurrenSeasonAnime() {
    let allAnimeData = [];
    try {
      const year = new Date().getFullYear();
      const season = this.getCurrentSeason();
      let morePagesAvailable = true;
      let currentPage = 0;
      while (morePagesAvailable) {
        currentPage++;
        const result = await this.fetchAnimeByYearAndSeason(
          year,
          season,
          currentPage
        );
        const hasNextPage = result.data.pagination.has_next_page;

        const animeData = result.data.data;

        animeData.forEach((anime) => {
          if (!this.animeIdsInDb.has(anime.mal_id)) {
            allAnimeData.push(anime);
            this.animeIdsInDb.add(anime.mal_id);
          }
        });

        morePagesAvailable = hasNextPage;
        /* timeout needed to avoid api request limit */
        await setTimeout(2500);
      }
      allAnimeData = allAnimeData.map((anime) => {
        return {
          id: anime.mal_id,
          name: anime?.title || "",
          synopsis: anime?.synopsis ?? null,
          genres: anime?.genres ? this.fetchGenres(anime.genres) : [],
          image_url: anime.images?.jpg?.image_url || null,
          embed_url: anime.trailer?.embed_url || null,
          score: anime?.score || null,
          episodes: anime.episodes,
          season: anime.season,
          year: anime.year,
        };
      });
      return allAnimeData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async fetchNextSeasonAnime() {
    let allAnimeData = [];
    try {
      const year = new Date().getFullYear();
      const currentSeason = this.getCurrentSeason();
      const season = this.getNextSeason(currentSeason);
      let morePagesAvailable = true;
      let currentPage = 0;
      while (morePagesAvailable) {
        currentPage++;
        const result = await this.fetchAnimeByYearAndSeason(
          year,
          season,
          currentPage
        );
        const hasNextPage = result.data.pagination.has_next_page;
        const animeData = result.data.data;

        animeData.forEach((anime) => {
          if (!this.animeIdsInDb.has(anime.mal_id)) {
            allAnimeData.push(anime);
            this.animeIdsInDb.add(anime.mal_id);
          }
        });

        morePagesAvailable = hasNextPage;
        /* timeout needed to avoid api request limit */
        await setTimeout(2500);
      }
      allAnimeData = allAnimeData.map((anime) => {
        return {
          id: anime.mal_id,
          name: anime?.title || "",
          synopsis: anime?.synopsis || null,
          genres: anime?.genres ? this.fetchGenres(anime.genres) : [],
          image_url: anime.images?.jpg?.image_url || null,
          embed_url: anime.trailer?.embed_url || null,
          score: anime?.score || null,
          episodes: anime.episodes,
          season: anime.season,
          year: anime.year,
        };
      });
      return allAnimeData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async fetchLastSeasonAnime() {
    let allAnimeData = [];
    try {
      const year = new Date().getFullYear();
      const currentSeason = this.getCurrentSeason();
      const season = this.getLastSeason(currentSeason);
      let morePagesAvailable = true;
      let currentPage = 0;
      while (morePagesAvailable) {
        currentPage++;
        const result = await this.fetchAnimeByYearAndSeason(
          year,
          season,
          currentPage
        );
        const hasNextPage = result.data.pagination.has_next_page;
        const animeData = result.data.data;

        animeData.forEach((anime) => {
          if (!this.animeIdsInDb.has(anime.mal_id)) {
            allAnimeData.push(anime);
            this.animeIdsInDb.add(anime.mal_id);
          }
        });

        morePagesAvailable = hasNextPage;
        /* timeout needed to avoid api request limit */
        await setTimeout(2500);
      }
      allAnimeData = allAnimeData.map((anime) => {
        return {
          id: anime.mal_id,
          name: anime?.title || "",
          synopsis: anime?.synopsis ?? null,
          genres: anime?.genres ? this.fetchGenres(anime.genres) : [],
          image_url: anime.images?.jpg?.image_url || null,
          embed_url: anime.trailer?.embed_url || null,
          score: anime?.score || null,
          episodes: anime.episodes,
          season: anime.season,
          year: anime.year,
        };
      });
      return allAnimeData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getCurrentSeason() {
    const currSeason = this.getSeason(new Date().getMonth() + 1);
    return currSeason;
  }

  getSeason(month) {
    if (month >= 3 && month <= 5) {
      return "spring";
    }
    if (month >= 6 && month <= 8) {
      return "summer";
    }
    if (month >= 9 && month >= 11) {
      return "fall";
    }
    return "winter";
  }

  getNextSeason(month) {
    const nextSeasons = {
      spring: "summer",
      fall: "winter",
      winter: "spring",
      summer: "fall",
    };
    return nextSeasons[month];
  }

  getLastSeason(month) {
    const nextSeasons = {
      spring: "winter",
      fall: "summer",
      winter: "fall",
      summer: "spring",
    };
    return nextSeasons[month];
  }

  fetchGenres(genres) {
    const result = { genreTypes: [] };

    for (let i = 0; i < genres.length; i++) {
      result.genreTypes = [...result.genreTypes, genres[i].name];
    }
    return result;
  }

  fetchAnimeByYearAndSeason(year, season, currentPage) {
    const animeAPIUrl = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${currentPage}`;
    return axios.get(animeAPIUrl);
  }
}

module.exports = AnimeDataFetcher;
