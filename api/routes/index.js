const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const spotsRouter = require("./spotsRouter");
const activitiesRouter = require("./activitiesRouter");
const reviewsRouter = require("./reviewsRouter");

router.use("/users", userRouter);
router.use("/activities", activitiesRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
