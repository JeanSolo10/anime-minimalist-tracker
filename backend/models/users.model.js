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
};
