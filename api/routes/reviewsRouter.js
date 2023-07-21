const express = require("express");
const { reviewsController } = require("../controllers");

const router = express.Router();

router.get("/:storeActivityId", reviewsController.getReviews);

module.exports = router;
