const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Basic health route
app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API' });
});

module.exports = app;
