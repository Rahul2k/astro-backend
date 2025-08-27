const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { getZodiacSign } = require('../utils/zodiacUtils');
require('dotenv').config();

exports.signup = async (req, res) => {
    const { name, email, password, birthdate } = req.body;

    if (!name || !email || !password || !birthdate) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const userBirthdate = new Date(birthdate);
        const zodiacSign = getZodiacSign(userBirthdate);

        user = new User({
            name,
            email,
            password, // Password will be hashed by the pre-save hook in the model
            birthdate: userBirthdate,
            zodiac: zodiacSign
        });

        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during signup.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ payload });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};
