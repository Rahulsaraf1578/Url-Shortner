const { redisClient } = require('../config/redis');

const getNextId = async () => {
  return await redisClient.incr('url:id');
};

module.exports = { getNextId };

