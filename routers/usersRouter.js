const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

const { checkValidity } = require("../middlewares/schemaValidator");
const { checkSchema } = require("express-validator");
const userRegister = require("../validations/userRegister");

router.post(
  "/register",
  checkSchema(userRegister),
  checkValidity,
  usersController.register
);
router.post("/login", usersController.login);

module.exports = router;
