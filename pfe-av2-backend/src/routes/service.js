const express = require("express");
const Joi = require("joi");
const logger = require("../logger");

const serviceSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  deadline: Joi.number().required(),
});

const requestSchema = Joi.array().items(
  Joi.object({
    price: Joi.number().required(),
    serviceDeadline: Joi.number().required(),
    scheduledDate: Joi.date().required(),
    status: Joi.string().required(),
    requestDate: Joi.date().required(),
    requestNumber: Joi.number().required(),
    clientId: Joi.string().required(),
    serviceId: Joi.number().required(),
  })
);

const router = express.Router();

router.get("/service", async (req, res) => {
  try {
    logger.info("Attempting to fetch all services");

    const [services] = await req.db.execute("SELECT * FROM services");

    logger.info("Successfully fetched all services");

    res.json(services);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/service/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    logger.info(`Attempting to fetch all services for client: ${id}`);

    const [services] = await req.db.execute(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );

    logger.info(`Successfully fetched all services for client: ${id}`);

    res.json(services);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/service", async (req, res) => {
  const { error } = serviceSchema.validate(req.body);
  if (error) {
    logger.warn(`Validation failed for creating a new service: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const name = req.body.name.toLowerCase();
    const { price } = req.body;

    logger.info(`Attempting to create a new service: ${name}`);

    await req.db.execute("INSERT INTO services (name, price) VALUES (?, ?)", [
      name,
      price,
    ]);

    logger.info(`Successfully created service: ${name}`);

    res.status(201).send("Service created successfully");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send("This service already exists");
    } else {
      logger.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.post("/service/request", async (req, res) => {
  const requests = req.body;
  const { error } = requestSchema.validate(requests);
  if (error) {
    logger.warn(`Validation failed for updating client requests: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const clientId = requests[0].clientId;

    logger.info(`Attempting to update requests for client: ${clientId}`);

    await req.db.execute("DELETE FROM requests WHERE clientId = ?", [clientId]);

    const insertValues = requests.map((request) => [
      request.price,
      request.serviceDeadline,
      request.scheduledDate,
      request.status,
      request.requestDate,
      request.requestNumber,
      request.clientId,
      request.serviceId,
    ]);

    await req.db.query(
      "INSERT INTO requests (price, serviceDeadline, scheduledDate, status, requestDate, requestNumber, clientId, serviceId) VALUES ?",
      [insertValues]
    );

    logger.info(`Successfully updated requests for client: ${clientId}`);

    res.status(204).send();
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send("This service already exists");
    } else {
      logger.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;
