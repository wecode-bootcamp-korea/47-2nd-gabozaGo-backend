const express = require("express");
const router = express.Router();
const storeActivityRouter = require("./storeActivityRouter");
const userRouter = require("./userRouter");
const spotsRouter = require("./spotsRouter");
const activitiesRouter = require("./activitiesRouter");
const reviewsRouter = require("./reviewsRouter");
const likesRouter = require("./likesRouter");
const orderRouter = require("./orderRouter");

router.use("/users", userRouter);
router.use("/activities", activitiesRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);
router.use("/storeActivities", storeActivityRouter);
router.use("/likes", likesRouter);
router.use("/order", orderRouter);

module.exports = router;
