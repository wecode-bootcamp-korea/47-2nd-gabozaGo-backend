const { reviewsService } = require("../services");
const { catchAsync } = require("../utils/error");

const getReviews = catchAsync(async (req, res) => {
  const { storeActivityId } = req.params;  
  const reviews = await reviewsService.getReviews(storeActivityId);  
  return res.status(200).json({ data: reviews });
});

module.exports = {
  getReviews
};
