const mongoose = require('mongoose');

const HoroscopeHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    zodiac: { type: String, required: true },
    horoscope: { type: String, required: true }
});

HoroscopeHistorySchema.index({ userId: 1, date: 1 }, { unique: true });

const HoroscopeHistory = mongoose.model('HoroscopeHistory', HoroscopeHistorySchema);
module.exports = HoroscopeHistory;
