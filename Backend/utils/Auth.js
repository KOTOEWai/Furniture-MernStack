const jwt = require('jsonwebtoken');
const { getCachUser, setCachUser } = require("./Usercache");
const User = require("../models/userModel");
const CustomError = require("./CustomError");

const asyncHandler = require("./asyncHandler");

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      throw new CustomError("Not authorized, no token", 401);
    }
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // 1. Try to get from Cache
    let userData = await getCachUser(`user:${userId}`);

    if (!userData) {
      // 2. Fallback to DB
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw new CustomError("Not authorized, user not found", 401);
      }

      userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      // 3. Update Cache
      await setCachUser(`user:${userId}`, userData);
    }

    req.user = userData;
    next();
  } catch (error) {
    throw new CustomError("Not authorized, token failed", 401);
  }
});


module.exports = { verifyToken };