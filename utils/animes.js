const axios = require("axios");

const AnimeDataFetcher = {
  async fetchCurrenSeasonAnime() {
    let allAnimeData = [];
    const result = {};
    try {
      let morePagesAvailable = true;
      let currentPage = 0;
      while (morePagesAvailable) {
        currentPage++;
        const result = await axios.get(
          `https://api.jikan.moe/v4/seasons/now?page=${currentPage}`
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
  fetchGenres(genres) {
    //console.log("INSIDE GENRES");
    const result = { genreTypes: [] };
    for (let i = 0; i < genres.length; i++) {
      result.genreTypes = [...result.genreTypes, genres[i].name];
    }
    return result;
  },
};

module.exports = AnimeDataFetcher;
