const express = require("express");
const { likesController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/:targetId", loginRequired, likesController.createLikes);

module.exports = router;
