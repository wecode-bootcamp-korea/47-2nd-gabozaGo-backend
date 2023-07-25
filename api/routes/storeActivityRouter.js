const express = require("express");
const { storeActivityController } = require("../controllers");
const { tokenRequiredOrNot } = require("../utils/auth");

const router = express.Router();
router.get("", tokenRequiredOrNot, storeActivityController.getActivityList);

module.exports = router;
