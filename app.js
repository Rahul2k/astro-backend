const express = require('express');
const connectDB = require('./config/databaseConfig');
const allRoutes = require('./routes/route');
require('dotenv').config();

// Connect to Database
connectDB();

const app = express();

// Init Middleware to parse JSON bodies
app.use(express.json());

// A simple root route for health checks
app.get('/', (req, res) => res.send('Horoscope API is running...'));

// Use the main router for all API endpoints
// All routes defined in the /routes directory will be prefixed with /api
app.use('/api', allRoutes);


module.exports = app;
