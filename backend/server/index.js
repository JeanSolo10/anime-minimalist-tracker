require("dotenv").config();
const app = require("./app");
const db = require("./knex");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.migrate.latest();
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
