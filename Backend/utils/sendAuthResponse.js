const { generateToken } = require("./core");
const { setCachUser } = require("./Usercache");
const { Msg } = require("./core");

const sendAuthResponse = async (res, user, message) => {
    const token = generateToken(user._id);
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    };
  
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token
    };
  
    // Cache and Response
    await setCachUser(`user:${user._id}`, userData);
    res.cookie("token", token, cookieOptions);
    Msg(res, message, userData);
  };

  module.exports = sendAuthResponse;