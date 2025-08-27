const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { getHoroscopeHistory, getTodaysHoroscope } = require('../controllers/horoscopeController');
const authMiddleware = require('../middleware/authMiddleware');
const apiRateLimiter = require('../middleware/rateLimiter');

router.use(apiRateLimiter, authMiddleware);

router.post('/signup', signup);
router.post('/login', login);
router.get('/horoscope/history', getHoroscopeHistory);
router.get('/horoscope/today', getTodaysHoroscope);



module.exports = router;
