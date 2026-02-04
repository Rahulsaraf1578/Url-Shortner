const { createClient } = require('redis');

const redisClient = createClient({
  username: 'default', // Redis Cloud username
  password: 'LVXJ9QF8tB9Na7sXGwgZxwTBnyK6CN6i', // Redis Cloud password
  socket: {
    host: 'redis-13116.c240.us-east-1-3.ec2.cloud.redislabs.com',
    port: 13116
  }
});

// Event listeners
redisClient.on('connect', () => console.log('🔴 Redis connected'));
redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

// Connect function
const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
    process.exit(1);
  }
};

module.exports = { redisClient, connectRedis };
