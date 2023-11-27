const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

// validazioni
const { body } = require("express-validator");

router.post(
  "/",
  body("content").isString().notEmpty().isLength({ min: 10 }),
  categoriesController.store
);

module.exports = router;
