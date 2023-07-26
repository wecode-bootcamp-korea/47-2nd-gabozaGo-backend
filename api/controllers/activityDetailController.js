const { activityDetailService } = require("../services");
const { catchAsync } = require("../utils/error");

const getDetailList = catchAsync(async function (req, res) {
  const storeActivityId = req.params.storeActivityId;
  const userId = req.user?.id;
  const result = await activityDetailService.getActivityDetail(userId, storeActivityId);

  res.status(200).json({ data: result });
});

module.exports = { getDetailList };
