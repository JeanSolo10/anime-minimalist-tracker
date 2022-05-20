const AnimeDataFetcher = require("../../utils/animes");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const data = await AnimeDataFetcher.fetchNextSeasonAnime();
  // Deletes ALL existing entries
  await knex("animes").insert(data);
};
