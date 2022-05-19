const knex = require("../knex");
const STATUS_TABLE = "anime_watch_status";

module.exports = {
  getAll() {
    return knex.select().from(STATUS_TABLE);
  },
  create(status) {
    return knex.insert(status).into(STATUS_TABLE);
  },
  getByUserId(id) {
    return knex.select().from(STATUS_TABLE).where({ user_id: id });
  },
  async update(uid, aid, payload) {
    const { status } = payload;
    if (status) {
      return knex(STATUS_TABLE)
        .where({ user_id: uid })
        .andWhere({ anime_id: parseInt(aid) })
        .update(payload);
    }
    throw Error(`Nothing to update`);
  },
  async delete(uid, aid) {
    const intaid = parseInt(aid);
    return knex(STATUS_TABLE)
      .where({ user_id: uid })
      .andWhere({ anime_id: intaid })
      .del();
  },
};
