const dataSource = require("./dataSource");

const getMaxHeadCount = async (storeActivityId) => {
  const [result] = await dataSource.query(
    `SELECT 
        max_head_count
        FROM store_activities
        WHERE id = ?`,
    [storeActivityId]
  );
  const maxHeadCount = result.max_head_count;
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
  if (result.length > 0 && result[0].totalReservedHeadCount !== null) {
    const [reservedHeadCount] = result;
    return reservedHeadCount.totalReservedHeadCount;
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
  return parseFloat(perPrice.per_price);
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
    `INSERT INTO orders (
      order_number,
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
  const orderId = result.id;
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
  orderNumber,
  storeActivityId,
  date,
  headCount,
  paymentMethodType,
  totalPrice,
  invoice
) => {
  const queryRunner = await dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

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
  purchaseWithPoint,
};
