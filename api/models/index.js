const dataSource = require("./dataSource");
const activitiesDao = require("./activitiesDao");
const userDao = require("./userDao");
const spotsDao = require("./spotsDao");
const reviewsDao = require("./reviewsDao");
const storeActivityDao = require("./storeActivityDao");
const likesDao = require("./likesDao");

module.exports = {
  dataSource,
  userDao,
  spotsDao,
  activitiesDao,
  reviewsDao,
  storeActivityDao,
  likesDao,
};
