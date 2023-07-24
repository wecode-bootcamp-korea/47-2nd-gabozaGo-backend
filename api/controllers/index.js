const userController = require("./userController");
const spotsController = require("./spotsController");
const activitiesController = require("./activitiesController");
const reviewsController = require("./reviewsController");
const storeActivityController = require("./storeActivityController");
const likesController = require("./likesController");
const orderController = require("./orderController");
const reservationController = require("./reservationController");

module.exports = {
  activitiesController,
  spotsController,
  orderController,
  userController,
  reviewsController,
  likesController,
  storeActivityController,
  reservationController,
};
