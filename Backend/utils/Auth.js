const jwt = require('jsonwebtoken');
const { RDB } = require("../utils/redisHelper");

const verifyToken = async(req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
    
      if(!token) return res.status(401).json({ error: 'Not authorized, no token' });

       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const savedToken = await RDB.get("User");
       if(!savedToken || savedToken !== token) return res.status(401).json({ error: 'Not authorized, token failed' });
       req.user = decoded.id;
       next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

module.exports = {verifyToken};