const express = require("express");
const Joi = require("joi");

const serviceSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required()
});

const requestSchema = Joi.array().items(Joi.object()).required();

const router = express.Router();

router.get("/service", async (req, res) => {
  try {
    const db = req.db;
    
    const services = await db.collection("services").find().toArray();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/service/:client", async (req, res) => {
  try {
    const db = req.db;
    const client = req.params.client.toLowerCase();

    const requests = await db.collection("requests").find({ client: client }).toArray();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/service", async (req, res) => {
  const { error } = serviceSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = req.db;
    const name = req.body.name.toLowerCase();
    const { price } = req.body;

    const service = await db.collection("services").findOne({ name });

    if (service) return res.status(409).send("Service Already Exists");

    await db.collection("services").insertOne({ name, price });

    res.send("Service Created Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/service/request", async (req, res) => {
  const requests = req.body;
  const { error } = requestSchema.validate(requests);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = req.db;
    const userId = requests[0].userId;
    
    await db.collection("requests").deleteMany({ userId: userId });
    await db.collection("requests").insertMany(requests);

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
