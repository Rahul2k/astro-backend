const rateLimit = require('express-rate-limit');

const apiRateLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5, 
    message: { message: 'Too many requests from this IP, please try again after a minute' },
    standardHeaders: true, 
    legacyHeaders: false, 
});

module.exports = apiRateLimiter;
