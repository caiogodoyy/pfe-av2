const express = require("express");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const db = req.db;
    const { username, password } = req.body;

    const user = await db.collection("clients").findOne({ username });

    if (!user || user.password !== password)
      return res.status(401).send("Invalid credentials");

    res.send("Login successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login/change-password", async (req, res) => {
  try {
    const db = req.db;
    const { username, oldPassword, newPassword } = req.body;

    const user = await db.collection("clients").findOne({ username });

    if (!user || user.password !== password)
      return res.status(401).send("Invalid credentials");

    await db
      .collection("clients")
      .updateOne({ username }, { $set: { password: newPassword } });

    res.send("Password changed successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
