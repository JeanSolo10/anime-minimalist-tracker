const express = require("express");
const cors = require("cors");
const decodeToken = require("../middleware");
const dotenv = require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

/* Firebase Middleware */
//app.use(decodeToken);

/* controllers */
const usersController = require("../controllers/users.controller");
const animesController = require("../controllers/animes.controller");
const ratingsController = require("../controllers/ratings.controller");

app.use("/api/v1/users", usersController);
app.use("/api/v1/animes", animesController);
app.use("/api/v1/ratings", ratingsController);

/* Heroku deployment configuration */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../..", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../..", "build", "index.html"));
  });
}

module.exports = app;
