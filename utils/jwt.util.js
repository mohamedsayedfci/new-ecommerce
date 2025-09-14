const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'verysecret';
module.exports = {
  sign: (payload, opts) => jwt.sign(payload, JWT_SECRET, opts || { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }),
  verify: (token) => jwt.verify(token, JWT_SECRET)
};
