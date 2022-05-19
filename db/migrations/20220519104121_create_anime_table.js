/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("animes", (table) => {
    table.increments("id").primary();
    table.string("name", 125).unique().notNullable().index();
    table.text("synopsis");
    table.json("genres");
    table.string("image_url", 200);
    table.string("embed_url", 200);
    table.float("score");
    table.integer("episodes");
    table.string("season", 12);
    table.integer("year");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("animes");
};
