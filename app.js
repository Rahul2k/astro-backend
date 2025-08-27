const express = require('express');
const connectDB = require('./config/databaseConfig');
const allRoutes = require('./routes/route');
require('dotenv').config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('Horoscope API is running...'));

app.use('/api', allRoutes);


module.exports = app;
