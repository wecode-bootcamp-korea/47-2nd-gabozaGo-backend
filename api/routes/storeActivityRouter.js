const express = require("express");
const { storeActivityController } = require("../controllers");
const { loginRequired, mainPageRequired } = require("../utils/auth");

const router = express.Router();
router.get("", mainPageRequired, storeActivityController.getActivityList);

module.exports = router;
