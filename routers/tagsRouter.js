const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.get("/", async (req, res, next) => {
  try {
    const tags = await tagsController.getAllTags();
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

router.post("/", tagsController.store);

module.exports = router;
