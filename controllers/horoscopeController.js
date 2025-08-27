
const User = require('../models/userModel');
const HoroscopeHistory = require('../models/horoscopeModel');
const horoscopes = require('../utils/horoscopeData');

exports.getTodaysHoroscope = async (req, res) => {
    try {
        const user = await User.findById(req.query.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const today = new Date().toISOString().split('T')[0]; 
        const zodiac = user.zodiac;
        const horoscopeText = horoscopes[zodiac] || "No horoscope found for your sign today.";

        const historyEntry = await HoroscopeHistory.findOneAndUpdate(
            { userId: user.id, date: today },
            { 
                $setOnInsert: {
                    userId: user.id,
                    date: today,
                    zodiac: zodiac,
                    horoscope: horoscopeText
                }
            },
            { upsert: true, new: true, runValidators: true }
        );

        res.json({
            date: historyEntry.date,
            zodiac: historyEntry.zodiac,
            horoscope: historyEntry.horoscope
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching horoscope.' });
    }
};

exports.getHoroscopeHistory = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

        const history = await HoroscopeHistory.find({
            userId: req.query.userId,
            date: { $gte: sevenDaysAgoStr }
        }).sort({ date: -1 }).select('date zodiac horoscope -_id');

        res.json(history);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching history.' });
    }
};
