const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const authMiddleware = require("./../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  console.log("SESSION USER:", req.session.user);
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.json(user);
  } catch (err) {
    res.status(404);
  }
});

module.exports = router;
