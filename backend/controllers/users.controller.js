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
router.get("/user/:username", async (req, res) => {
  try {
    const arg = req.params.username;
    const user = await Users.getByUsername(arg);
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

// @desc Get user by id
// GET Request
router.get("/:id", async (req, res) => {
  try {
    const arg = req.params.id;
    const user = await Users.getById(arg);
    if (user) {
      res.status(200).json({ results: user });
    } else {
      res.status(404).json({
        message: `User not found! Verify that id is valid`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Add new user
// POST Request
// add decodeToken middleware
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    await Users.create(userData);
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Modify user
// PATCH Request
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await Users.update(id, payload);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Deletes user
// DELETE Request
// add decodeToken middleware
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Users.delete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
