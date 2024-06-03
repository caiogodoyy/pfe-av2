const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const changePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});

const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = req.db;
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    const user = await db.collection("clients").findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).send("Invalid Credentials");

    res.send("Login Successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login/change-password", async (req, res) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = req.db;
    const email = req.body.email.toLowerCase();
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);
    const { oldPassword } = req.body;

    const user = await db.collection("clients").findOne({ email });

    if (!user || !await bcrypt.compare(oldPassword, user.password))
      return res.status(401).send("Invalid Credentials");

    await db
      .collection("clients")
      .updateOne({ email }, { $set: { password: newPassword } });

    res.send("Password Changed Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
