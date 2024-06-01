const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

async function connectToMongo() {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_NAME);
    console.log("Connected to MongoDB");

    const collections = await db.collections();
    const collectionNames = collections.map((col) => col.collectionName);

    if (!collectionNames.includes("clients"))
      await db.createCollection("clients");
    if (!collectionNames.includes("services"))
      await db.createCollection("services");
    if (!collectionNames.includes("solicitations"))
      await db.createCollection("solicitations");
    console.log("Migrations completed");

    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connectToMongo };
