const express = require("express");
const { orderController } = require("../controllers");

const router = express.Router();

router.post("/order/point", orderController.orderWithPoint);

module.exports = { router };
