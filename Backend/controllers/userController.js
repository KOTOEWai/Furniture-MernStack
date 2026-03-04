const User = require("../models/userModel");
const { generateToken, Msg } = require("../utils/core");
const { setCachUser } = require("../utils/Usercache");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new CustomError('Missing required fields', 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new CustomError('User already exists', 400);
  }

  const newuser = await User.create({ username, email, password });

  const token = generateToken(newuser._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
  });

  const user = {
    id: newuser._id,
    username: newuser.username,
    email: newuser.email,
    role: newuser.role,
    token
  };

  // Cache user by ID
  await setCachUser(`user:${newuser._id}`, user);

  Msg(res, "User created successfully", user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError('Missing required fields', 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new CustomError('Invalid credentials', 401);
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
  });

  const userdetails = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token
  };

  // Cache user by ID
  await setCachUser(`user:${user._id}`, userdetails);

  Msg(res, "User logged in successfully", userdetails);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  Msg(res, "Users fetched successfully", users);
});

const getByUserId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  Msg(res, "User fetched successfully", user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { username, role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { username, role }, { new: true });
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  Msg(res, "User updated successfully", user);
});

const dropUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  Msg(res, "User deleted successfully", user);
});

const getme = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new CustomError('Not authenticated', 401);
  }
  res.status(200).json(req.user);
});

module.exports = {
  registerUser: register,
  loginUser: login,
  getAllUsers: getUsers,
  getByUserId,
  updateUser,
  dropUser,
  getme
};
