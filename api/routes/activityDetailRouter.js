const express = require("express");
const { activityDetailController } = require("../controllers");
const { tokenRequiredOrNot } = require("../utils/auth");

const router = express.Router();

router.get("/:storeActivityId", tokenRequiredOrNot, activityDetailController.getDetailList);

module.exports = router;
