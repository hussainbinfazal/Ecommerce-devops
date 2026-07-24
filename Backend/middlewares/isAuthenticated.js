const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const protect = async (req, res, next) => {
  try {
    let token;
   
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

    }else if(req.cookies.token){
      token = req.cookies.token;
    }

  
    
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const authenticatedUser = await User.findById(decodedUser.id).select('-password');
    req.user = authenticatedUser;
    next();
  } catch (error) {
    res.status(401);
  }
};


const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

module.exports = { protect, admin };