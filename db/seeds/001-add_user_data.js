/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const data = {
    email: "test2@gmail.com",
    username: "testuser2",
    id: "al6x167A3pUFApuWZYAT0WZircR2",
  };
  await knex("users").del();
  await knex("users").insert(data);
};
