const jwt = require('jsonwebtoken');

const generateToken = (userId,res) => {
  const token =  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
    
  });
  res.cookie('token', token, {
    httpOnly: true,
    // secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.setHeader('Authorization', `Bearer ${token}`);
  return token;
};

module.exports = generateToken;