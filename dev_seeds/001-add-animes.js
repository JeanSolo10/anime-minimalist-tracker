const AnimeDataFetcher = require("../../utils/animes");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const data = await AnimeDataFetcher.fetchCurrenSeasonAnime();
  // Deletes ALL existing entries
  await knex("animes").del();
  await knex("animes").insert(data);
};
