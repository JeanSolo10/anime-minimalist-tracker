const axios = require("axios");

const AnimeDataFetcher = {
  async fetchCurrenSeasonAnime() {
    let allAnimeData = [];
    try {
      const year = new Date().getFullYear();
      const season = this.getCurrentSeason();
      let morePagesAvailable = true;
      let currentPage = 0;
      while (morePagesAvailable) {
        currentPage++;
        const url = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${currentPage}`;
        const result = await axios.get(url);
        const hasNextPage = result.data.pagination.has_next_page;
        allAnimeData = [...allAnimeData, ...result.data.data];
        morePagesAvailable = hasNextPage;
      }
      allAnimeData = allAnimeData.map((anime) => {
        return {
          id: anime.mal_id,
          name: anime.title,
          synopsis: anime.synopsis,
          genres: this.fetchGenres(anime.genres),
          image_url: anime.images.jpg.image_url,
          embed_url: anime.trailer.embed_url,
          score: anime.score,
          episodes: anime.episodes,
          season: anime.season,
          year: anime.year,
        };
      });
      return allAnimeData;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  fetchGenres(genres) {
    const result = { genreTypes: [] };
    for (let i = 0; i < genres.length; i++) {
      result.genreTypes = [...result.genreTypes, genres[i].name];
    }
    return result;
  },
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
        const result = await axios.get(
          `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${currentPage}`
        );
        const hasNextPage = result.data.pagination.has_next_page;
        allAnimeData = [...allAnimeData, ...result.data.data];
        morePagesAvailable = hasNextPage;
      }
      allAnimeData = allAnimeData.map((anime) => {
        return {
          id: anime.mal_id,
          name: anime.title,
          synopsis: anime.synopsis,
          genres: this.fetchGenres(anime.genres),
          image_url: anime.images.jpg.image_url,
          embed_url: anime.trailer.embed_url,
          score: anime.score,
          episodes: anime.episodes,
          season: anime.season,
          year: anime.year,
        };
      });
      return allAnimeData;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getCurrentSeason() {
    const currSeason = this.getSeason(new Date().getMonth());
    return currSeason;
  },
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
  },
  getNextSeason(month) {
    const nextSeasons = {
      spring: "summer",
      fall: "winter",
      winter: "spring",
      summer: "fall",
    };
    return nextSeasons[month];
  },
};

module.exports = AnimeDataFetcher;
