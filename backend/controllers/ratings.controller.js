const express = require("express");
const router = express.Router();
const Ratings = require("../models/ratings.model");
const decodeToken = require("../middleware");

// @desc Get all ratings
// GET Request
router.get("/", async (req, res) => {
  try {
    const ratings = await Ratings.getAll();
    res.status(200).json({ results: ratings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get rating by id
// GET Request
router.get("/:id", async (req, res) => {
  try {
    const arg = req.params.id;
    const rating = await Ratings.getById(arg);
    if (rating) {
      res.status(200).json({ results: rating });
    } else {
      res.status(404).json({
        message: `Rating not found! Verify that id is valid`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Add new rating
// POST Request
// add decodeToken middleware
router.post("/", async (req, res) => {
  try {
    const ratingData = req.body;
    await Ratings.create(ratingData);
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Modify rating
// PATCH Request
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await Ratings.update(id, payload);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Deletes rating
// DELETE Request
// add decodeToken middleware
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Ratings.delete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
