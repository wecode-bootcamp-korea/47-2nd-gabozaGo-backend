const likesService = require("../services/likesService");
const { catchAsync } = require("../utils/error");

const getLikes = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const likes = await likesService.getUserLikes(userId);
  return res.status(200).json({ data: likes });
});

const createLikes = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const targetId = req.params.targetId;
  const likes = await likesService.createLikes(userId, targetId);
  return res.status(200).json({ likes });
});

module.exports = {
  createLikes,
  getLikes,
};
