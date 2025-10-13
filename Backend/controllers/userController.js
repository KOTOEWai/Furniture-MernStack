const User = require("../models/userModel");
const { generateToken ,Msg } = require("../utils/core");
const {RDB} = require("../utils/redisHelper");
const register = async (req, res) => {
  try {
  const { username, email, password } = req.body;

  if( !username || !email || !password){
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const newuser = await User.create({ username, email, password });
  const token = generateToken(newuser._id);
  const user = {
    id: newuser._id,
    username: newuser.username,
    email: newuser.email,
    role: newuser.role,
    token
  }
  Msg(res,"User created successfully",user)
}catch(err){
  return res.status(500).json({ error: 'Internal server error' });
}
   
} 
const login = async(req, res) => {
  
  try {
  const { email, password } = req.body;
 if(!email || !password){
  return res.status(400).json({ error: 'Missing required fields' });
 }
 const user = await User.findOne({ email });
 if (!user) {
  return res.status(400).json({ error: 'User not found' });
 }
 const isMatch = await user.matchPassword(password);
 if (!isMatch) {
  return res.status(400).json({error: "password is not correct !"});
 }
 
 const token = generateToken(user._id);
 await RDB.set("User",token);
 const userdetails = {
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  token
 }
 Msg(res,"User logged in successfully",userdetails)
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getUsers = async (req, res) => {
 try {
    const users = await User.find().select('-password');
    if(!users){
      return res.status(404).json({ error: 'Users not found' });
    }
    Msg(res,"Users fetched successfully",users)
 }catch(error){
   res.status(500).json({ error: 'Internal server error' });
 }
}

const getByUserId = async ( req, res)=>{
   try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
          return res.status(404).json({ error: 'User not found' });
        }
        Msg(res,"User fetched successfully",user)
   }catch(error){
     res.status(500).json({ error: 'Internal server error' });
   }
}

const updateUser = async (req,res)=>{
  try{
      const { username , password , role } = req.body;
       
       const updateUser = { username , password , role };
       
       const user = await User.findByIdAndUpdate( req.params.id, updateUser, { new: true });
       if(!user){
         return res.status(404).json({ error: 'User not found' });
       }
       Msg(res,"User updated successfully",user)
  }catch(error){
    res.status(500).json({error:"Internal server error"})
  }
}

const dropUser = async(req,res)=>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      return res.status(404).json({ error: 'User not found' });
    }
    Msg(res,"User deleted successfully",user)
  }catch(error){
    res.status(500).json({error:"internal server error"})
  }
}

const getme = async (req,res)=>{
   try {
    let dbUser = req.user;
    console.log(dbUser);
     if(!dbUser){
       return res.status(404).json({ error: 'User not found' });
     }
     Msg(res,"User fetched successfully",dbUser)
   }catch(error){
     res.status(500).json({ error: 'Internal server error' });
   }
}

module.exports = { registerUser: register, loginUser: login, getAllUsers: getUsers , getByUserId , updateUser ,dropUser ,getme };