const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'verysecret';
module.exports = (req,res,next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.status(401).json({ error: 'No token provided' });
  const parts = authHeader.split(' ');
  if(parts.length !== 2) return res.status(401).json({ error: 'Token error' });
  const scheme = parts[0], token = parts[1];
  if(!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Malformed token' });
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  }catch(e){ return res.status(401).json({ error: 'Invalid token' }); }
};
