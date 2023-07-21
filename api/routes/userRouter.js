const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

router.get("/signin", userController.signIn);
router.post("/info", loginRequired, userController.updateUserInfo);

module.exports = router;
