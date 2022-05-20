const express = require("express");
const router = express.Router();
const Animes = require("../models/animes.model");
const decodeToken = require("../middleware");

// @desc Get all anime
// GET Request
router.get("/", async (req, res) => {
  try {
    const anime = await Animes.getAll();
    res.status(200).json({ results: anime });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Get all anime by season
// GET Request
router.get("/season/:season", async (req, res) => {
  try {
    const arg = req.params.season;
    const animes = await Animes.getByseason(arg.toLowerCase());
    res.status(200).json({ results: animes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Get unique anime
// GET Request
router.get("/:idOrName", async (req, res) => {
  try {
    const arg = req.params.idOrName;
    const anime = isNaN(arg)
      ? await Animes.getByName(arg)
      : await Animes.getById(arg);
    if (anime) {
      res.status(200).json({ results: anime });
    } else {
      res.status(404).json({
        message: `Anime not found! Verify that the id or name is valid`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Add new anime
// POST Request
// TODO: Only allow admin to modify anime
router.post("/", async (req, res) => {
  try {
    const animeData = req.body;
    const anime = await Animes.create(animeData);
    res
      .status(201)
      .json({ message: `Anime successfully added`, results: anime });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Update anime
// PATCH Request
// TODO: Only allow admin to modify anime
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await Animes.update(id, payload);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Delete anime
// DEL Request
// TODO: Only allow admin to modify anime
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Animes.delete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
