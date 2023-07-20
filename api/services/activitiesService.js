const { activitiesDao } = require("../models");

const getAllActivities = async () => {
  return await activitiesDao.getAllActivities();
};

module.exports = {
  getAllActivities,
};
