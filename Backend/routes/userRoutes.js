
const router = require("express").Router();
const { registerUser, loginUser, getAllUsers ,getByUserId , updateUser ,dropUser ,getme } = require("../controllers/userController");
const { validate, signupValidation, loginValidation, updateUserValidation  } = require("../utils/core");
const { verifyToken } = require("../utils/Auth");



router.post("/register",signupValidation,validate, registerUser);
router.post("/login",loginValidation,validate, loginUser);
router.get("/",verifyToken, getAllUsers);
router.get("/me",verifyToken,getme);
router.get("/:id",verifyToken, getByUserId);
router.patch("/update/:id", verifyToken,updateUserValidation,validate, updateUser);
router.delete("/delete/:id",verifyToken,dropUser );
module.exports = router;
