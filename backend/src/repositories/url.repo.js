const { getDB } = require('../config/db');

const COLLECTION = 'urls';

const createUrl = async (data) => {
  const db = getDB();
  return db.collection(COLLECTION).insertOne(data);
};

const findByShortCode = async (shortCode) => {
  const db = getDB();
  return db.collection(COLLECTION).findOne({ shortCode });
};

const findByLongUrl = async (longUrl) => {
  const db = getDB();
  return db.collection(COLLECTION).findOne({ longUrl });
};

module.exports = {
  createUrl,
  findByShortCode,
  findByLongUrl
};
