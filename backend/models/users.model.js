const knex = require("../knex");
const USERS_TABLE = "users";
const STATUS_TABLE = "anime_watch_status";
const RATING_TABLE = "ratings";

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
    return knex.select().from(USERS_TABLE).where({ id: id });
  },
  getRatingByUserAndAnimeId(uid, aid) {
    return knex
      .select()
      .from(RATING_TABLE)
      .where({ user_id: uid })
      .andWhere({ anime_id: parseInt(aid) });
  },
  getStatusByUserAndAnimeId(uid, aid) {
    return knex
      .select()
      .from(STATUS_TABLE)
      .where({ user_id: uid })
      .andWhere({ anime_id: parseInt(aid) });
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
