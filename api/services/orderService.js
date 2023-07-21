const { orderDao } = require("../models");

const headCountCapacityCheck = async (storeActivityId, date) => {
  const maxHeadCount = await orderDao.getMaxHeadCount(storeActivityId);
  const reservedHeadCount = await orderDao.getReservedHeadCount(
    storeActivityId,
    date
  );
  const headCountCapacity = maxHeadCount - reservedHeadCount;
  return headCountCapacity;
};

const calculateTotalPrice = async (storeActivityId, headCount) => {
  const perPrice = await orderDao.getStoreActivityPerPrice(storeActivityId);
  const totalPrice = perPrice * headCount;
  return totalPrice;
};

const getUserPoint = async (userId) => {
  const userPoint = await orderDao.getUserPointById(userId);
  return userPoint;
};

const checkAndPurchaseWithPoint = async (
  userId,
  storeActivityId,
  date,
  headCount
) => {
  try {
    const headCountCapacity = await headCountCapacityCheck(
      storeActivityId,
      date
    );
    const reservationRoom = headCountCapacity - headCount;
    if (reservationRoom < 0) {
      const error = new Error("HEAD_COUNT_EXCEED");
      error.statusCode = 403;
      throw error;
    }
    const totalPrice = await calculateTotalPrice(storeActivityId, headCount);
    const userPoint = await getUserPoint(userId);
    if (totalPrice > userPoint) {
      const error = new Error("NOT_ENOUGH_POINT");
      error.statusCode = 403;
      throw error;
    }
    await orderDao.purchaseWithPoint(
      userId,
      storeActivityId,
      date,
      headCount,
      totalPrice
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { checkAndPurchaseWithPoint };
