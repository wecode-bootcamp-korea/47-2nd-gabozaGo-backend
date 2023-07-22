const likesService = require("../services/likesService");
const { catchAsync } = require("../utils/error");

const createLikes = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const targetId = req.params.targetId;
  const likes = await likesService.createLikes(userId, targetId);
  return res.status(200).json({ likes });
});

module.exports = {
  createLikes,
};
