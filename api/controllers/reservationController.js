const { reservationService } = require("../services");
const { catchAsync } = require("../utils/error");

const getMyReservation = catchAsync(async (req, res) => {
  const userId = req.user;
  const result = await reservationService.myReservation(userId);

  return res.status(200).json({ data: result });
});

module.exports = { getMyReservation };
