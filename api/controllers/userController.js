const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signIn = catchAsync(async (req, res) => {
  const kakaoCode = req.query.code;

  const accessToken = await userService.signIn(kakaoCode);

  return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  signIn,
};
