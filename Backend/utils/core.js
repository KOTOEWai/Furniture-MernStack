const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

const Msg = (res, msg = "", result = {}) => {
    res.status(200).json({ con: true, msg, result });
};
const ErrorMsg = (res, msg = "", result = {}) => {
    res.status(400).json({ con: false, msg, result });
};

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Short-lived
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET, { expiresIn: '7d' }); // Long-lived
};



module.exports = {
    Msg, ErrorMsg, generateAccessToken, generateRefreshToken
}
