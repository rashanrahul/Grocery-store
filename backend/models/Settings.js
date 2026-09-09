const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Sunil Store',
  },
  tagline: {
    type: String,
    default: 'Fresh Choices, Happy Homes.',
  },
  phone: {
    type: String,
    default: '0775163271',
  },
  address: {
    type: String,
    default: 'Udalamatta, Galle',
  },
  mapUrl: {
    type: String,
    default: 'https://www.google.com/maps/place/Sunil+Store/@6.1829866,80.2948983,17z',
  },
  openTime: {
    type: String,
    default: '06:00',
  },
  closeTime: {
    type: String,
    default: '21:00',
  },
  openDays: {
    type: [Number],
    default: [0, 1, 2, 3, 4, 5, 6],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Settings', settingsSchema);