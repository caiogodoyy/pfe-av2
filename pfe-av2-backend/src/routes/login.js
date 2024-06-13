const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const logger = require("../logger");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const changePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(8).required(),
});

const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    logger.warn(`Validation failed for login: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  } 

  try {
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    logger.info(`Attempting to login for client: ${email}`);

    const [client] = await req.db.execute(
      "SELECT * FROM clients WHERE email = ?",
      [email]
    );

    if (client.length < 1 || !(await bcrypt.compare(password, client[0].password))) {
      logger.warn(`Login failed for client: ${email}`);
      return res.status(401).send("Invalid Credentials");
    }

    logger.info(`Successfully login for client: ${email}`);

    const { password: removePassword, ...returnClientBody } = client[0];

    res.json({
      message: "Login Successful",
      user: returnClientBody
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login/change-password", async (req, res) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    logger.warn(`Validation failed for password change: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  } 

  try {
    const email = req.body.email.toLowerCase();
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);

    logger.info(`Attempting to change password for client: ${email}`);

    const [client] = await req.db.execute(
      "SELECT * FROM clients WHERE email = ?",
      [email]
    );

    if (client.length < 1) {
      logger.warn(`Password change failed for client: ${email}`);
      return res.status(401).send("Invalid Credentials");
    }

    await req.db.execute(
      "UPDATE clients SET password = ? WHERE email = ?",
      [newPassword, email]
    );

    logger.info(`Successfully changed password for client: ${email}`);

    const { password: removePassword, ...returnClientBody } = client[0];

    res.json({
      message: "Password changed successfully",
      user: returnClientBody
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
