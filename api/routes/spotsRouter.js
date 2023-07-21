const express = require("express");
const router = express.Router();

const { spotsController } = require("../controllers");

router.get("", spotsController.getSpots);

module.exports = router;
