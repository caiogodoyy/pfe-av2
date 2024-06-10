const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  phone: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
  civilStatus: Joi.string().required(),
  education: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).optional(),
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
      "INSERT INTO clients (id, name, cpf, birthDate, civilStatus, education, email, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, name, cpf, birthDate, civilStatus, education, email, password, phone || null]
    );

    const returnClientBody = {
      id: id,
      name: name,
      cpf: cpf,
      birthDate: birthDate,
      civilStatus: civilStatus,
      education: education,
      email: email,
      phone: phone || null
    };

    res.status(201).json({
      message: "Client created successfully",
      user: returnClientBody
    });
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
