const express = require("express");
const Joi = require("joi");

const serviceSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
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
    const [services] = await req.db.execute("SELECT * FROM services");

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/service/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [services] = await req.db.execute(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/service", async (req, res) => {
  const { error } = serviceSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const name = req.body.name.toLowerCase();
    const { price } = req.body;

    await req.db.execute("INSERT INTO services (name, price) VALUES (?, ?)", [
      name,
      price,
    ]);

    res.status(201).send("Service created successfully");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send("This service already exists");
    } else {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.post("/service/request", async (req, res) => {
  const requests = req.body;
  const { error } = requestSchema.validate(requests);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const clientId = requests[0].clientId;

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

    res.status(204).send();
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send("This service already exists");
    } else {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;
