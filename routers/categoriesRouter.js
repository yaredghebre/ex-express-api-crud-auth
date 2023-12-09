const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

// validazioni
const { body } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const categories = await categoriesController.getAllCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  body("content").isString().notEmpty().isLength({ min: 10 }),
  categoriesController.store
);

module.exports = router;
