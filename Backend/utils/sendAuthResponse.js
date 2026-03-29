const { generateAccessToken, generateRefreshToken } = require("./core");
const { setCachUser } = require("./Usercache");
const { Msg } = require("./core");
const RefreshToken = require("../models/refreshTokenModel");

const sendAuthResponse = async (res, user, message) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to database for session management
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  const userData = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    accessToken
  };

  // Cache and Response
  await setCachUser(`user:${user._id}`, userData);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  Msg(res, message, userData);
};

module.exports = sendAuthResponse;