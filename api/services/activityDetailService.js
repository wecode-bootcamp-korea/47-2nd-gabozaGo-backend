const { activityDetailDao } = require("../models");

const getActivityDetail = async (userId, storeActivityId) => {
  if (!userId) {
    const result1 = await activityDetailDao.publicActivityDetail(storeActivityId);
    return result1;
  } else {
    const result2 = await activityDetailDao.prviteActivityDetail(userId, storeActivityId);
    return result2;
  }
};
module.exports = { getActivityDetail };
