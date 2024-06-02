const express = require("express");
const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
});

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

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
