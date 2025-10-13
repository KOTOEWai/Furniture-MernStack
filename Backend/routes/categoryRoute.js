const router = require('express').Router();
const { getAllCategories , postCategory, getCategoryById ,dropCategory , patchCategory} = require('../controllers/categoryController'); 
const { validate ,validateCategory } = require('../utils/core');
const { saveFile } = require('../utils/gallary');
const { verifyToken } = require("../utils/Auth");
router.get('/',verifyToken,getAllCategories); 
router.get('/:id',verifyToken,getCategoryById );
router.post('/create',verifyToken,saveFile,postCategory);
router.delete('/delete/:id',verifyToken , dropCategory);
router.patch('/update/:id',verifyToken,validateCategory,validate,patchCategory);


module.exports = router;