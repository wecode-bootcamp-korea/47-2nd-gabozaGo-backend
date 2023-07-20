const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router.get("/signin", userController.signIn);

module.exports = router;
