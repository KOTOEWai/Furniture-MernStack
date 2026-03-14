const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

const Msg = (res, msg = "", result = {}) => {
    res.status(200).json({ con: true, msg, result });
};
const ErrorMsg = (res, msg = "", result = {}) => {
    res.status(400).json({ con: false, msg, result });
};
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}



module.exports = {
    Msg, ErrorMsg, generateToken
}
