const knex = require("../knex");
const RATINGS_TABLE = "ratings";

module.exports = {
  getAll() {
    return knex.select().from(RATINGS_TABLE);
  },
  create(user) {
    return knex.insert(user).into(RATINGS_TABLE);
  },
  getById(id) {
    return knex.select().from(RATINGS_TABLE).where({ id: id }).first();
  },
  async update(id, payload) {
    if (!(await this.getById(id))) {
      throw Error(`ID '${id}' does not exit`);
    }
    const { rating } = payload;
    if (rating) {
      return knex(RATINGS_TABLE).where({ id: id }).update(payload);
    }
    throw Error(`Nothing to update`);
  },
  async delete(id) {
    if (!(await this.getById(id))) {
      throw Error(`ID '${id}' does not exit`);
    }
    return knex(RATINGS_TABLE).where({ id: id }).del();
  },
};
