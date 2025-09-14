const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number, default: 1 },
    price: Number
  }],
  total: Number,
  status: { type: String, enum: ['pending','paid','completed','cancelled'], default: 'pending' },
  stripePaymentIntentId: String
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
