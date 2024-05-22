require("dotenv").config({
  path: "./.env",
});

module.exports = {
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
