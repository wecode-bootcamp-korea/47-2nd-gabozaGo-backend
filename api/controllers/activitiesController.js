const activitiesService = require("../services/activitiesService");
const { catchAsync } = require("../utils/error");

const getActivities = catchAsync(async (req, res) => {
  const activities = await activitiesService.getAllActivities();
  return res.status(200).json({ data: activities });
});

module.exports = {
  getActivities,
};
