const AnimeDataFetcher = require("../../utils/animes");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const animeFetcher = new AnimeDataFetcher();

  // Deletes ALL existing entries
  await knex("animes").del();

  const currentSeasonAnimeData = await animeFetcher.fetchCurrenSeasonAnime();
  await knex("animes").insert(currentSeasonAnimeData);

  const nextSeasonAnimeData = await animeFetcher.fetchNextSeasonAnime();
  await knex("animes").insert(nextSeasonAnimeData);

  const lastSeasonAnimeData = await animeFetcher.fetchLastSeasonAnime();
  await knex("animes").insert(lastSeasonAnimeData);
};
