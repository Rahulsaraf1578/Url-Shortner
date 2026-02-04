const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

let client;

async function connectDB() {
  if (!uri) {
    console.warn('⚠️ MONGO_URI not set. Skipping MongoDB connection (running without DB).');
    return;
  }

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log("✅ MongoDB connected successfully");

    return client;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Do not exit the process — allow the server to run for local development
    return;
  }
}

module.exports = connectDB;
