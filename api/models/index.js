const dataSource = require("./dataSource");
const activitiesDao = require("./activitiesDao");
const userDao = require("./userDao");
const spotsDao = require("./spotsDao");


module.exports = {
  dataSource,
  userDao,
  spotsDao,
  activitiesDao,
};