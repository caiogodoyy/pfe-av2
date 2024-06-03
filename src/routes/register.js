const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
  civilStatus: Joi.string().required(),
  education: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const id = uuidv4();
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 10);
    const { name, cpf, birthDate, civilStatus, education } = req.body;

    await req.db.execute(
      "INSERT INTO clients (id, name, cpf, birthDate, civilStatus, education, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, name, cpf, birthDate, civilStatus, education, email, password]
    );

    res.status(201).send("Client created successfully");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send("This client already exists");
    } else {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;
