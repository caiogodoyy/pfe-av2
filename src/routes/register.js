const express = require("express");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const db = req.db;
    const { username, password } = req.body;

    const user = await db.collection("clients").findOne({ username });

    if (user) return res.status(409).send("User already exists");

    await db.collection("clients").insertOne({ username, password });

    res.send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
