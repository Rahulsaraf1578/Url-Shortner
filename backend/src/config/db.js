const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

let client;
let db;

async function connectDB() {
  if (!uri) {
    console.warn('⚠️ MONGO_URI not set. Skipping MongoDB connection.');
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
    db = client.db(process.env.DB_NAME);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
}

module.exports = {
  connectDB,
  getDB,
};
