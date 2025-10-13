const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');



const Msg = (res, msg = "", result = {}) => {
  res.status(200).json({ con: true, msg, result });
};
const ErrorMsg = (res, msg = "", result = {}) => {
  res.status(400).json({ con: false, msg, result });
};
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

const signupValidation = [
    body('username').trim().notEmpty().isLength({min:3}).withMessage("username must be at least 3 characters"),
    body('email').trim().notEmpty().isEmail().withMessage("invalid email"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 characters")
]
const loginValidation = [
    body('email').trim().notEmpty().isEmail().withMessage("invalid email"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 characters")
]

const updateUserValidation = [
    body('username').optional().trim().isLength({min:3}).withMessage("username must be at least 3 characters"),
    body('password').optional().isLength({min:6}).withMessage("password must be at least 6 characters"),
    body('role').optional().isIn(['user', 'admin']).withMessage("role must be either 'user' or 'admin'")
]

const validateCategory = [
     body('name').trim().notEmpty().isLength({min:3}).withMessage("name must be at least 3 characters"),
     body('imageLink').optional().trim().notEmpty().isLength({min:3}).withMessage("imageLink must be at least 3 characters"),
     body('description').optional().trim().notEmpty().isLength({min:3}).withMessage("description must be at least 3 characters"),
     body('parentCategory').optional().isMongoId().withMessage("invalid parent category id")
]

const productValidate = [
    body('name').trim().notEmpty().isLength({min:3}).withMessage("name must be at least 3 characters"),
    body('description').optional().trim().notEmpty().isLength({min:3}).withMessage("description must be at least 3 characters"),
    body('dimensions').optional().custom((value) => {
       if( typeof value === 'object'){
            throw new ( Error("dimensions must be an object"))
       }
       return true
    }),
    body('dimensions.depth').optional().isNumeric().withMessage("depth must be a number"),
    body('dimensions.width').optional().isNumeric().withMessage("width must be a number"),
    body('dimensions.height').optional().isNumeric().withMessage("height must be a number"),
    body('category').optional().isMongoId().withMessage("invalid category id"),
    body('price').optional().isNumeric().withMessage("price must be a number"),
    body('discount_price').optional().isNumeric().withMessage("discount_price must be a number"),
    body('stock').optional().isNumeric().withMessage("stock must be a number"),
    body('tags').optional().isLength({min:3}).withMessage("tags must be at least 3 characters"),
]

const validate = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}




module.exports = {
    Msg ,ErrorMsg , generateToken , signupValidation ,loginValidation , updateUserValidation , validate , validateCategory  ,productValidate 
}
