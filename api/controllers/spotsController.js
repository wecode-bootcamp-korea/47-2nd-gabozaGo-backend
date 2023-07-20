const spotsService = require("../services/spotsService");
const { catchAsync } = require("../utils/error");

const getSpots = catchAsync(async (req, res) => {
  const spots = await spotsService.getAllSpots();
  return res.status(200).json({ data: spots });
});

module.exports = {
  getSpots,
};
