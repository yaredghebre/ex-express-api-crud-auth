const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.post("/", tagsController.store);

module.exports = router;
