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
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    const [client] = await req.db.execute(
      "SELECT * FROM clients WHERE email = ?",
      [email]
    );

    if (client.length < 1 || !(await bcrypt.compare(password, client[0].password)))
      return res.status(401).send("Invalid Credentials");

    const { password: removePassword, ...returnClientBody } = client[0];

    res.json({
      message: "Login Successful",
      user: returnClientBody
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login/change-password", async (req, res) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const email = req.body.email.toLowerCase();
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);
    const { oldPassword } = req.body;

    const [client] = await req.db.execute(
      "SELECT * FROM clients WHERE email = ?",
      [email]
    );

    if (client.length < 1 || !(await bcrypt.compare(oldPassword, client[0].password)))
      return res.status(401).send("Invalid Credentials");

    await req.db.execute(
      "UPDATE clients SET password = ? WHERE email = ?",
      [newPassword, email]
    );

    const { password: removePassword, ...returnClientBody } = client[0];

    res.json({
      message: "Password changed successfully",
      user: returnClientBody
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
