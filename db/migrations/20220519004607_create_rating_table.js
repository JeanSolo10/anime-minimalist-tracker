/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("ratings", (table) => {
    table.increments("id").primary();
    table.integer("rating").notNullable();
    table.string("user_id");
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("anime_id");
    table
      .foreign("anime_id")
      .references("id")
      .inTable("animes")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("anines");
};
