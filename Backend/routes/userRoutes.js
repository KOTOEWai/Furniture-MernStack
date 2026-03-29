
const router = require("express").Router();
const { registerUser, loginUser, getAllUsers, getByUserId, updateUser, dropUser, getme, refreshToken, logoutUser } = require("../controllers/userController");
const { verifyToken } = require("../utils/Auth");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validations/userValidations");
const { authLimiter } = require("../middleware/rateLimiter");


router.post("/register", authLimiter, validate(registerSchema), registerUser);
router.post("/login", authLimiter, validate(loginSchema), loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);
router.get("/", verifyToken, getAllUsers);
router.get("/me", verifyToken, getme);
router.get("/:id", verifyToken, getByUserId);
router.patch("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, dropUser);
module.exports = router;
