const dataSource = require("./dataSource");
const activitiesDao = require("./activitiesDao");
const userDao = require("./userDao");
const spotsDao = require("./spotsDao");
const reviewsDao = require("./reviewsDao");
const storeActivityDao = require("./storeActivityDao");

module.exports = {
  dataSource,
  userDao,
  spotsDao,
  activitiesDao,
  reviewsDao,
  storeActivityDao,
};
