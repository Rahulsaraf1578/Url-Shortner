const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Basic health route
app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API' });
});

const urlRoutes = require('./src/routes/url.routes');

// API endpoints
app.use('/api', urlRoutes);

// Redirect endpoints (THIS LINE WAS MISSING)
app.use('/', urlRoutes);

module.exports = app;
