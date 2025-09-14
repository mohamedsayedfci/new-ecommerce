const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'verysecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const VERIFICATION_CODE_EXPIRE_MINUTES = 15;

class AuthService {
  async register({ name, email, password, phone }) {
    const exists = await User.findOne({ email });
    if (exists) throw new Error('Email already in use');
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, phone });
    return user;
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
    const token = this._signToken({ id: user._id });
    return { user, token };
  }

  _signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  verifyToken(token) { return jwt.verify(token, JWT_SECRET); }

  _generateNumericCode(len = 6) {
    const digits = '0123456789'; let code = ''; for(let i=0;i<len;i++) code+=digits[Math.floor(Math.random()*digits.length)]; return code;
  }

  _createTransporter() {
    const host = process.env.SMTP_HOST; const port = process.env.SMTP_PORT; const user = process.env.SMTP_USER; const pass = process.env.SMTP_PASS;
    if(!host||!port||!user||!pass) return null;
    return nodemailer.createTransport({ host, port: Number(port), secure: process.env.SMTP_SECURE==='true', auth: { user, pass } });
  }

  async sendEmailVerificationCode(email) {
    const user = await User.findOne({ email });
    if(!user) throw new Error('User not found');
    const code = this._generateNumericCode(6);
    const hashed = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now()+VERIFICATION_CODE_EXPIRE_MINUTES*60*1000);
    user.verificationCode = hashed; user.verificationCodeExpiresAt = expiresAt; await user.save();
    const transporter = this._createTransporter();
    const mail = { from: process.env.EMAIL_FROM||'no-reply@local', to: user.email, subject: 'Your verification code', text: `Your verification code is: ${code}` };
    if(!transporter){ console.log('[VERIFICATION CODE]', code, 'for', user.email); return { ok:true, message:'Code logged to console' }; }
    await transporter.sendMail(mail);
    return { ok:true };
  }

  async verifyEmailCode(email, code) {
    const user = await User.findOne({ email });
    if(!user) throw new Error('User not found');
    if(!user.verificationCode || !user.verificationCodeExpiresAt) throw new Error('No active code');
    if(user.verificationCodeExpiresAt < new Date()){ user.verificationCode=undefined; user.verificationCodeExpiresAt=undefined; await user.save(); throw new Error('Code expired'); }
    const match = await bcrypt.compare(code, user.verificationCode);
    if(!match) throw new Error('Invalid code');
    user.isEmailVerified = true; user.verificationCode=undefined; user.verificationCodeExpiresAt=undefined; await user.save();
    return { ok:true };
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    if(!user) throw new Error('User not found');
    const match = await bcrypt.compare(oldPassword, user.password);
    if(!match) throw new Error('Old password incorrect');
    user.password = await bcrypt.hash(newPassword, 10); await user.save();
    return { ok:true };
  }
}

module.exports = new AuthService();
