const { orderService } = require("../services");
const { catchAsync } = require("../utils/error");

const orderWithPoint = catchAsync(async (req, res) => {
  const { storeActivityId, date, headCount } = req.body;
  const userId = req.user.id;
  const point = req.user.point;

  if (!storeActivityId || !date || !headCount) {
    const error = new Error("KEY_ERROR");
    error.ststusCode = 400;

    throw error;
  }

  await orderService.checkAndPurchaseWithPoint(
    userId,
    storeActivityId,
    date,
    headCount,
    point
  );

  return res.status(201).json({ message: "RESERVATION_SUCCESS" });
});

const checkCapacity = catchAsync(async (req, res) => {
  const storeActivityId = req.params.storeActivityId;

  const capacityList = await orderService.capacityListCheck(storeActivityId);

  res.status(200).json({ capacityList });
});

module.exports = { orderWithPoint, checkCapacity };
