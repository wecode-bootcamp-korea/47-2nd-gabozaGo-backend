const { orderService } = require("../services");
const { catchAsync } = require("../utils/error");

const orderWithPoint = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { storeActivityId, date, headCount } = req.body;

  if (!storeActivityId || !date || !headCount) {
    const error = new Error("KEY_ERROR");
    error.ststusCode = 400;
    throw error;
  }

  await orderService.checkAndPurchaseWithPoint(
    userId,
    storeActivityId,
    date,
    headCount
  );

  return res.status(201).json({ message: "RESERVATION_SUCCESS" });
});

module.exports = { orderWithPoint };
