const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");

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
    const db = req.db;
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 10);
    const { name, cpf, birthDate, civilStatus, education } = req.body;

    const client = await db.collection("clients").findOne({ email: email });

    if (client) return res.status(409).send("Client Already Exists");

    await db.collection("clients").insertOne({ email, password, name, cpf, 
      birthDate, civilStatus, education });

    res.send("Client Created Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
