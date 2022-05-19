const express = require("express");
const router = express.Router();
const WatchStatus = require("../models/status.model");
const decodeToken = require("../middleware");

// @desc Get all watch status
// GET Request
router.get("/", async (req, res) => {
  try {
    const status = await WatchStatus.getAll();
    res.status(200).json({ results: status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get watch status by user
// GET Request
router.get("/:user_id", async (req, res) => {
  try {
    const arg = req.params.user_id;
    const status = await WatchStatus.getByUserId(arg);
    if (status) {
      res.status(200).json({ results: status });
    } else {
      res.status(404).json({
        message: `Watch status not found! Verify that user id is valid`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Add new watch status
// POST Request
// add decodeToken middleware
router.post("/", async (req, res) => {
  try {
    const statusData = req.body;
    await WatchStatus.create(statusData);
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Modify watch status via user and anime id
// PATCH Request
router.patch("/:user_id/:anime_id", async (req, res) => {
  try {
    const { user_id, anime_id } = req.params;
    const payload = req.body;
    await WatchStatus.update(user_id, anime_id, payload);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Deletes watch status via user and anime id
// DELETE Request
// add decodeToken middleware
router.delete("/:user_id/:anime_id", async (req, res) => {
  try {
    const { user_id, anime_id } = req.params;
    await WatchStatus.delete(user_id, anime_id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
