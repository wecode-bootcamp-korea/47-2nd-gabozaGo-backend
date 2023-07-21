const { userService } = require("../services");
const { catchAsync } = require("../utils/error");
const jwt = require("jsonwebtoken");

const updateUserInfo = catchAsync(async (req, res) => {
  const { userSpots, userActivities, phoneNumber, socialPlatform } = req.body;

  const userId = req.user.id;

  const result = await userService.updateUserInfo(
    userId,
    userSpots,
    userActivities,
    { phoneNumber, socialPlatform }
  );

  res.status(200).json(result);
});

const signIn = catchAsync(async (req, res) => {
  const kakaoCode = req.query.code;

  const accessToken = await userService.signIn(kakaoCode);

  return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  signIn,
  updateUserInfo,
};
