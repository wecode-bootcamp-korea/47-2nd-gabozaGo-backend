const { storeActivityService } = require("../services");
const { catchAsync } = require("../utils/error");

const getActivityList = catchAsync(async function (req, res) {
  let { spotId, limit, offset } = req.query;
  const userId = req.user?.id;
  const result = await storeActivityService.storeActivityList(userId, spotId, limit, offset);

  res.status(200).json({ data: result });
});

module.exports = {
  getActivityList,
};
