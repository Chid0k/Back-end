const express = require("express");
const path = require("path");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

// get photo and comment of user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await User.find();
  try {
    const data = await Photo.find({ user_id: id }).lean(); // có thể sửa dữ liệu
    data.forEach((e) => {
      const cmts = e.comments;
      cmts.forEach((cmt) => {
        const user = users.find(
          (u) => u._id.toString() === cmt.user_id.toString()
        );
        cmt.user = user;
      });
    });
    res.json(data);
  } catch (err) {
    res.status(404);
  }
});

// get photo by name of photo
router.get("/photo/:name", async (req, res) => {
  const { name } = req.params;
  const filePath = path.join(__dirname, "..", "uploads", name);
  try {
    res.sendFile(filePath);
  } catch (err) {
    res.status(404);
  }
});

module.exports = router;
