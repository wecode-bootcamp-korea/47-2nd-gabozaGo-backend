const dataSource = require("./dataSource");

const getReservation = async function (userId) {
  const result = await dataSource.query(
    `
      SELECT
      o.user_id AS userId,
      o.order_number AS orderNumber,
      o.date AS reservationDate,
      o.head_count AS headCount,
      o.total_price AS totalPrice,
      o.reservation_status AS reservationStatus,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'storeId', s.id,
              'storeName', s.name,
              'storePhoneNumber', s.phone_number,
              'storeAddress', CONCAT(s.city, ' ', s.district),
              'imageUrl', (
                  SELECT image FROM store_activity_images sai
                  WHERE sai.store_activity_id = sa.id
                  LIMIT 1 
              )
          )
      ) AS stores
  FROM orders o
  LEFT JOIN users u ON o.user_id = u.id
  LEFT JOIN store_activities sa ON o.store_activity_id = sa.id
  LEFT JOIN stores s ON sa.store_id = s.id
  WHERE u.id = ?
    AND o.order_status = "approved"
    AND o.reservation_status IN ("beforeReservation", "reservationDay", "afterReservation")
  GROUP BY o.id;
   `,
    [userId]
  );
  return result;
};

module.exports = { getReservation };
