const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nameSi: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    default: '📦',
    maxlength: 4,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);