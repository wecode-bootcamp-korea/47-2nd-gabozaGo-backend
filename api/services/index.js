const spotsService = require("./spotsService");
const userService = require("./userService");
const orderService = require("./orderService");
const activitiesService = require("./activitiesService");
const storeActivityService = require("./storeActivityService");
const likesService = require("./likesService");
const reservationService = require("./reservationService");
const activityDetailService = require("./activityDetailService");
const reviewsService = require("./reviewsService");

module.exports = {
  activitiesService,
  userService,
  spotsService,
  reviewsService,
  storeActivityService,
  likesService,
  orderService,
  reservationService,
  activityDetailService,
};
