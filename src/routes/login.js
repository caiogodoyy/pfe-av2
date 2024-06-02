const express = require("express");
const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
});

const changePasswordSchema = Joi.object({
  username: Joi.string().min(5).required(),
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});

const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

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
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

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
