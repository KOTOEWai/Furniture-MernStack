const router = require('express').Router();
const { getProducts , postProduct } = require('../controllers/productController');
const { validate , productValidate } = require('../utils/core');
const { verifyToken } = require("../utils/Auth");
const { multipleFile} = require("../utils/gallary");
router.get('/', getProducts);
router.post('/create',verifyToken,productValidate,validate,multipleFile, postProduct);
module.exports = router;