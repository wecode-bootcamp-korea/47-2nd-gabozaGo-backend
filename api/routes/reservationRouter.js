const express = require("express");
const router = express.Router();
const { reservationController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

router.get("/my", loginRequired, reservationController.getMyReservation);

module.exports = router;
