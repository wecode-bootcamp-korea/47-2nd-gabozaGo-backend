const dataSource = require("./dataSource");
const activitiesDao = require("./activitiesDao");
const userDao = require("./userDao");
const spotsDao = require("./spotsDao");
const reviewsDao = require("./reviewsDao");
const storeActivityDao = require("./storeActivityDao");
const likesDao = require("./likesDao");
const orderDao = require("./orderDao");
const reservationDao = require("./reservationDao");
const activityDetailDao = require("./activityDetailDao");

module.exports = {
  dataSource,
  userDao,
  spotsDao,
  activitiesDao,
  likesDao,
  reviewsDao,
  orderDao,
  activitiesDao,
  storeActivityDao,
  likesDao,
  reservationDao,
  activityDetailDao,
};
