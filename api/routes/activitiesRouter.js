const express = require("express");
const { activitiesController } = require("../controllers");

const router = express.Router();

router.get("", activitiesController.getActivities);

module.exports = router;
