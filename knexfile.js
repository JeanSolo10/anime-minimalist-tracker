require("dotenv").config({
  path: "./.env",
});

// resolution for SSL configuration issue with heroku https://stackoverflow.com/questions/61785729/knex-heroku-error-self-signed-certificate
const sslConfig =
  process.env.NODE_ENV === "production"
    ? { ssl: { rejectUnauthorized: false } }
    : {};

module.exports = {
  client: "pg",
  connection: {
    connectionString:
      process.env.DATABASE_URL ||
      `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`,
    ...sslConfig,
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
