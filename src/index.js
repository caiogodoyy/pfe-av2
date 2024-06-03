const express = require("express");

const { connectToDatabase } = require("./db")
const router = require("./routes/index");

const PORT = process.env.APPLICATION_PORT || 3000;

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const db = await connectToDatabase();

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });
}

module.exports = { startServer };
