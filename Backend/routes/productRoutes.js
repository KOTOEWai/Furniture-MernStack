const router = require('express').Router();
const { getProducts , postProduct } = require('../controllers/productController');

const { verifyToken } = require("../utils/Auth");
const { multipleFile} = require("../utils/gallary");
router.get('/', getProducts);
router.post('/create',verifyToken,multipleFile, postProduct);
module.exports = router;