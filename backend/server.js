require('dotenv').config();

const app = require('./app');
const {connectDB} = require('./src/config/db.js');
const { connectRedis } = require('./src/config/redis');

connectDB();
connectRedis();

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Set a different PORT or free the port and try again.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
