const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("/api/admin/login");
  const { login_name, login_pass } = req.body;
  const user = await User.findOne({
    login_name: login_name,
    login_pass: login_pass,
  });
  if (!user) {
    return res
      .status(401)
      .json({ status: "FAIL", message: "Invalid credentials" });
  }
  return res.json(user);
});

router.post("/logout", (req, res) => {
  console.log("POST /api/admin/logout");
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: "FAIL", message: "Logout failed" });
    }
    return res.json({ status: "OK", message: "Logout successful" });
  });
});

module.exports = router;
