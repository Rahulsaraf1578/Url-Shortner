const { createUrl, findByShortCode, findByLongUrl } = require('../repositories/url.repo');
const { encodeBase62 } = require('../utils/base62');
const { getNextId } = require('./id.service');
const { redisClient } = require('../config/redis');

const shorten = async (longUrl) => {
  // Optional optimization
  const existing = await findByLongUrl(longUrl);
  if (existing) return existing;

  const id = await getNextId();
  const shortCode = encodeBase62(id);

  const urlData = {
    shortCode,
    longUrl,
    clicks: 0,
    createdAt: new Date()
  };

  await createUrl(urlData);
  await redisClient.set(`short:${shortCode}`, longUrl);

  return urlData;
};

const resolve = async (shortCode) => {
  const cached = await redisClient.get(`short:${shortCode}`);
  if (cached) return cached;

  const url = await findByShortCode(shortCode);
  if (!url) return null;

  await redisClient.set(`short:${shortCode}`, url.longUrl);
  return url.longUrl;
};

module.exports = { shorten, resolve };
