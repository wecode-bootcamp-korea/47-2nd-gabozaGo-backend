const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const spotsRouter = require("./spotsRouter");
const activitiesRouter = require("./activitiesRouter");

router.use("/users", userRouter);
router.use("/activities", activitiesRouter);
router.use("/spots", spotsRouter);

module.exports = router;
