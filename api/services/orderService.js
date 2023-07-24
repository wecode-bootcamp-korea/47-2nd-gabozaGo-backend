const { orderDao } = require("../models");
const { v4 } = require("uuid");

const startDateMaker = () => {
  const rawDate = new Date();
  rawDate.setDate(rawDate.getDate() + 1);
  const startDate = rawDate.toISOString().slice(0, 10);
  return startDate;
};

const endDateMaker = () => {
  const rawDate = new Date();
  rawDate.setDate(rawDate.getDate() + 15);
  const endDate = rawDate.toISOString().slice(0, 10);
  return endDate;
};

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

const capacityListCheck = async (storeActivityId) => {
  const storeActivityIdCheck = await orderDao.storeActivityIdCheck(
    storeActivityId
  );

  if (!storeActivityIdCheck) {
    const error = new Error("NO_SUCH_STORE_ACTIVITY");
    error.statusCode = 404;
    throw error;
  }

  const startDate = startDateMaker();
  const endDate = endDateMaker();

  const maxHeadCount = await orderDao.getMaxHeadCount(storeActivityId);
  const reservedHeadCountList = await orderDao.getReservedHeadCountList(
    storeActivityId,
    startDate,
    endDate
  );

  const capacityList = [];

  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const date = currentDate.toISOString().slice(0, 10);
    const reservedHeadCountItem = reservedHeadCountList.find(
      (item) => item.date === date
    );
    const reservedHeadCount = reservedHeadCountItem
      ? Number(reservedHeadCountItem.reservedHeadCount)
      : 0;
    const headCountCapacity = maxHeadCount - reservedHeadCount;

    capacityList.push({ date, headCountCapacity });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return capacityList;
};

module.exports = { checkAndPurchaseWithPoint, capacityListCheck };
