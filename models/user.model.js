const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpiresAt: Date,
  phone: String,
  isPhoneVerified: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
