const express = require("express");
const router = express.Router();
const Users = require("../models/users.model");
const decodeToken = require("../middleware");

// @desc Get all users
// GET Request
router.get("/", async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json({ results: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get user by username
// GET Request
router.get("/:idOrName", async (req, res) => {
  try {
    const arg = req.params.idOrName;
    const user = isNaN(arg) ? await Users.getByUsername(arg) : undefined;
    if (user) {
      res.status(200).json({ results: user });
    } else {
      res.status(404).json({
        message: `User not found! Verify that name is valid`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Add new user
// POST Request
router.post("/", decodeToken, async (req, res) => {
  try {
    const userData = req.body;
    await Users.create(userData);
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
