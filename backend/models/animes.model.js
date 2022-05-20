const knex = require("../knex");
const ANIME_TABLE = "animes";
const validParams = [
  "id",
  "name",
  "synopsis",
  "genres",
  "image_url",
  "embed_url",
];
const requiredParams = ["id", "name"];

module.exports = {
  getAll() {
    return knex
      .select()
      .from(ANIME_TABLE)
      .orderByRaw("score desc NULLS LAST")
      .orderBy("id", "asc");
  },
  getById(id) {
    return knex.select().from(ANIME_TABLE).where({ id: id });
  },
  getByseason(season) {
    return knex
      .select()
      .from(ANIME_TABLE)
      .where({ season: season })
      .orderByRaw("score desc NULLS LAST")
      .orderBy("id", "asc");
  },
  getByName(name) {
    return knex
      .select()
      .from(ANIME_TABLE)
      .whereILike("name", `${name}`)
      .first();
  },
  async create(anime) {
    this.validFields(anime);
    this.validRequiredFields(anime);
    const animeExists = (await this.getByName(anime.name)) ? true : false;
    if (animeExists) {
      throw Error(`Anime already exists!`);
    }
    return knex.insert(anime).into(ANIME_TABLE).returning("*");
  },
  async update(id, anime) {
    if (!(await this.getById(id))) {
      throw Error(`ID '${id}' does not exit`);
    }
    this.validFields(anime);
    return knex(ANIME_TABLE).where({ id: id }).update(anime);
  },
  async delete(id) {
    if (!(await this.getById(id))) {
      throw Error(`ID '${id}' does not exit`);
    }
    return knex(ANIME_TABLE).where({ id: id }).del();
  },
  validFields(data) {
    for (const field in data) {
      if (!validParams.includes(field)) {
        throw Error(`Invalid field: ${field}`);
      }
    }
    return;
  },
  validRequiredFields(data) {
    for (const field of requiredParams) {
      if (!(field in data)) {
        throw Error(`Required fields missing`);
      }
    }
    return;
  },
};
