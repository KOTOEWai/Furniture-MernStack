const User = require("../models/userModel");
const { Msg, generateAccessToken } = require("../utils/core");
const RefreshToken = require("../models/refreshTokenModel");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");
const sendAuthResponse = require("../utils/sendAuthResponse");


// --- Controllers ---

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Business check (Validation logic moves to Middleware)
  if (await User.findOne({ email })) {
    throw new CustomError('Email already exists', 400);
  }
  if (await User.findOne({ username })) {
    throw new CustomError('Username already taken', 400);
  }

  const newUser = await User.create({ username, email, password });
  await sendAuthResponse(res, newUser, "User created successfully");
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password'); // Ensure password is included for comparison
  if (!user || !(await user.matchPassword(password))) {
    throw new CustomError('Invalid credentials', 401);
  }

  await sendAuthResponse(res, user, "User logged in successfully");
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean(); // .lean() for faster read-only
  Msg(res, "Users fetched successfully", users);
});

exports.getByUserId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw new CustomError('User not found', 404);
  Msg(res, "User fetched successfully", user);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) throw new CustomError('User not found', 404);
  Msg(res, "User updated successfully", user);
});

exports.dropUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new CustomError('User not found', 404);
  Msg(res, "User deleted successfully", null);
});

exports.getme = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new CustomError("No refresh token found", 401);

  const storedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!storedToken) throw new CustomError("Invalid refresh token", 401);

  if (storedToken.expiresAt < new Date()) {
    await RefreshToken.deleteOne({ token: refreshToken });
    throw new CustomError("Refresh token expired", 401);
  }

  // Verify JWT
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET);
    const newAccessToken = generateAccessToken(decoded.id);

    res.status(200).json({
      success: true,
      accessToken: newAccessToken
    });
  } catch (err) {
    throw new CustomError("Invalid refresh token signature", 401);
  }
});

exports.logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict"
  });

  Msg(res, "Logged out successfully", null);
});