const knex = require("../knex");
const USERS_TABLE = "users";

module.exports = {
  getAll() {
    return knex.select().from(USERS_TABLE);
  },
  create(user) {
    return knex.insert(user).into(USERS_TABLE);
  },
  getByUsername(username) {
    return knex.select().from(USERS_TABLE).where({ username });
  },
  getById(id) {
    return knex.select().from(USERS_TABLE).where({ id: id }).first();
  },
  async update(id, payload) {
    if (!(await this.getById(id))) {
      throw Error(`ID '${id}' does not exit`);
    }
    const { username, email } = payload;
    if (username || email) {
      return knex(USERS_TABLE).where({ id: id }).update(payload);
    }
    throw Error(`Nothing to update`);
  },
  async delete(id) {
    if (!(await this.getById(id))) {
      throw Error(`ID '${id}' does not exit`);
    }
    return knex(USERS_TABLE).where({ id: id }).del();
  },
};
