
const router = require("express").Router();
const { registerUser, loginUser, getAllUsers ,getByUserId , updateUser ,dropUser ,getme } = require("../controllers/userController");
const { verifyToken } = require("../utils/Auth");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validations/userValidations");


router.post("/register",validate(registerSchema), registerUser);
router.post("/login",validate(loginSchema), loginUser);
router.get("/",verifyToken, getAllUsers);
router.get("/me",verifyToken,getme);
router.get("/:id",verifyToken, getByUserId);
router.patch("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id",verifyToken,dropUser );
module.exports = router;
