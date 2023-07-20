const { dataSource } = require("./dataSource");
const { v4 } = require("uuid");

const getMaxHeadCount = async (storeActivityId) => {
  const [maxHeadCount] = await dataSource.query(
    `SELECT 
        max_head_count
        FROM store_activities
        WHERE id = ?`,
    [storeActivityId]
  );
  return maxHeadCount;
};

const getReservedHeadCount = async (storeActivityId, date) => {
  const result = await dataSource.query(
    `SELECT 
      store_activity_id, date,
      SUM(head_count) AS totalReservedHeadCount
      FROM orders
      WHERE 
        store_activity_id = ? 
        AND date = ? 
        AND order_status = 'approved'
        AND reservation_status = 'beforeReservation'
      GROUP BY store_activity_id, date
    `,
    [storeActivityId, date]
  );
  if (result.length > 0) {
    const reservedHeadCount = result[0].reservedHeadCount;
    return reservedHeadCount;
  } else {
    const reservedHeadCount = 0;
    return reservedHeadCount;
  }
};

const getStoreActivityPerPrice = async (storeActivityId) => {
  const [perPrice] = await dataSource.query(
    `
    SELECT per_price
    FROM store_activities
    WHERE id = ?
    `,
    [storeActivityId]
  );
  return perPrice;
};

const getUserPointById = async (userId) => {
  const [userPoint] = await dataSource.query(
    `
    SELECT point
    FROM users
    WHERE id = ?
  `,
    [userId]
  );
  return userPoint !== null ? userPoint : 0;
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

const createOrder = async (
  queryRunner,
  orderNumber,
  userId,
  storeActivityId,
  date,
  headCount,
  totalPrice
) => {
  await queryRunner.query(
    `INSERT INTO orders(
      orderNumber,
      user_id,
      store_activity_id,
      date, 
      head_count,
      total_price,
      order_status,
      reservation_status
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
      )`,
    [
      orderNumber,
      userId,
      storeActivityId,
      date,
      headCount,
      totalPrice,
      "approved",
      "beforeReservation",
    ]
  );
};

const getOrderId = async (queryRunner, orderNumber) => {
  const [result] = await queryRunner.query(
    `SELECT id
      FROM orders
      WHERE order_number = ?
    `,
    [orderNumber]
  );
  const orderId = result[0].id;
  return orderId;
};

const createPayment = async (
  queryRunner,
  orderId,
  paymentMethodType,
  totalPrice,
  invoice
) => {
  await queryRunner.query(
    `INSERT INTO payments(
      order_id,
      payment_method_type,
      amount_total,
      invoice
    ) VALUES (
      ?,
      ?,
      ?,
      ?
      )`,
    [orderId, paymentMethodType, totalPrice, invoice]
  );
};

const updatePoint = async (queryRunner, totalPrice, userId) => {
  await queryRunner.query(
    `UPDATE users
    SET point = point - ?
    WHERE id = ?`,
    [totalPrice, userId]
  );
};

const purchaseWithPoint = async (
  userId,
  storeActivityId,
  date,
  headCount,
  paymentMethodType = "point",
  totalPrice,
  invoice
) => {
  const queryRunner = await dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const orderNumber = await generateOrderNumber();

    await createOrder(
      queryRunner,
      orderNumber,
      userId,
      storeActivityId,
      date,
      headCount,
      totalPrice
    );

    const orderId = await getOrderId(queryRunner, orderNumber);

    await createPayment(
      queryRunner,
      orderId,
      paymentMethodType,
      totalPrice,
      invoice
    );

    await updatePoint(queryRunner, totalPrice, userId);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();

    throw error;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getMaxHeadCount,
  getReservedHeadCount,
  getStoreActivityPerPrice,
  getUserPointById,
  purchaseWithPoint,
};
