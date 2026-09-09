const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nameSi: String,
  qty: Number,
  price: Number,
  unit: String,
});

const orderSchema = new mongoose.Schema({
  seq: {
    type: Number,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);