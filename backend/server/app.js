const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

/* Endpoints */
app.get("/api/v1", (req, res) => {
  return res.status(200).json({ results: "HEROKU!" });
});

/* Heroku deployment configuration */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../..", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../..", "build", "index.html"));
  });
}

module.exports = app;
