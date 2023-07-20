const express = require("express");
const { spotsController } = require("../controllers");

const router = express.Router();

router.get("", spotsController.getSpots);

module.exports = router;
