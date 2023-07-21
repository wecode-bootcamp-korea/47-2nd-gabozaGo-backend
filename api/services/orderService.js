const { orderDao } = require("../models");

const { v4 } = require("uuid");

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

const generateOrderNumber = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const randomString = v4();
  const orderNumber = `${year}${month}${day}-${randomString}`;
  return orderNumber;
};

const checkAndPurchaseWithPoint = async (
  userId,
  storeActivityId,
  date,
  headCount,
  point
) => {
  const headCountCapacity = await headCountCapacityCheck(storeActivityId, date);

  const reservationRoom = headCountCapacity - headCount;

  const userPoint = point;

  if (reservationRoom < 0) {
    const error = new Error("HEAD_COUNT_EXCEED");
    error.statusCode = 422;
    throw error;
  }

  const totalPrice = await calculateTotalPrice(storeActivityId, headCount);

  if (totalPrice > userPoint) {
    const error = new Error("NOT_ENOUGH_POINT");
    error.statusCode = 422;
    throw error;
  }

  const orderNumber = generateOrderNumber();

  const paymentMethodType = "point";
  const invoice = JSON.stringify({
    paymentType: "point",
    status: "approved",
  });

  return await orderDao.purchaseWithPoint(
    userId,
    orderNumber,
    storeActivityId,
    date,
    headCount,
    paymentMethodType,
    totalPrice,
    invoice
  );
};

module.exports = { checkAndPurchaseWithPoint };
