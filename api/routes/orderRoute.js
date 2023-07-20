const express = require("express");
const { orderController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/order/point", loginRequired, orderController.orderWithPoint);

module.exports = { router };
