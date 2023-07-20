const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const spotsRouter = require("./spotsRouter");

router.use("/users", userRouter);
router.use("/spots", spotsRouter);

module.exports = router;
