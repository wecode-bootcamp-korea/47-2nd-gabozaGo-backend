const { spotsType } = require("../enum/spots");
const { storeActivityDao } = require("../models");

const storeActivityList = async (userId, spotId, limit, offset) => {
  if (!userId) {
    const getspotId = (spotId) => {
      if (!spotId || !spotId) {
        return [spotsType.동북부, spotsType.동남부, spotsType.서북부, spotsType.서남부, spotsType.제주도];
      } else {
        const spotIds = parseInt(spotId);
        return [spotIds];
      }
    };
    const spotIds = getspotId(spotId);
    return await storeActivityDao.defaultActivityList(spotIds, limit, offset);
  } else {
    return await storeActivityDao.userActivityList(userId, spotId, limit, offset);
  }
};

module.exports = {
  storeActivityList,
};
