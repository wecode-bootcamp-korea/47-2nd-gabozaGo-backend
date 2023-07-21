const { reviewsDao } = require("../models");

const getReviews = async (storeActivityId) => {
  return await reviewsDao.getReviews(storeActivityId);
};

module.exports = {
  getReviews,
};
