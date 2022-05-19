/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("animes").del();
  await knex("animes").insert([{ id: 1, name: "Anime Test" }]);
};
