const { spotsDao } = require("../models");

const getAllSpots = async () => {
  return await spotsDao.getAllSpots();
};

module.exports = {
  getAllSpots,
};