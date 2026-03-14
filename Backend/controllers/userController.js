const User = require("../models/userModel");
const {  Msg } = require("../utils/core");

const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");
const sendAuthResponse = require("../utils/sendAuthResponse");


// --- Controllers ---

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Business check (Validation logic moves to Middleware)
  if (await User.findOne({ email })) {
    throw new CustomError('User already exists', 400);
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