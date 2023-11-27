const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post("/password-reset", auth.password_reset);

module.exports = router;
