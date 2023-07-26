const dataSource = require("./dataSource");

const publicActivityDetail = async function (storeActivityId) {
  try {
    const [result] = await dataSource.query(
      `
      SELECT
    sa.id AS storeActivityId,
    a.name AS activityName,
    s.spot_id AS spotId,
    s.name AS StoreName,
    s.phone_number AS phoneNumber,
    s.post_number AS postNumber,
    sa.per_price AS price,
    CONCAT(s.city, ' ', s.district) AS  storeAddress, 
    s.description,
    ROUND(scoreAvg.avg_score, 1) AS scoreAvg,
    JSON_ARRAYAGG(sai.image) AS imageUrls,
    NULL AS likes
FROM
    store_activities sa
LEFT JOIN stores s ON sa.store_id = s.id
LEFT JOIN activities a ON a.id = sa.activity_id
LEFT JOIN (
    SELECT store_activity_id, AVG(score) AS avg_score
    FROM store_activity_reviews
    GROUP BY store_activity_id
) scoreAvg ON scoreAvg.store_activity_id = sa.id
LEFT JOIN (
    SELECT
        store_activity_id,
        image
    FROM store_activity_images
) sai ON sai.store_activity_id = sa.id
WHERE sa.id = ?
GROUP BY sa.id, a.name, s.spot_id, s.name, s.phone_number, s.post_number, s.city, s.district, s.description, scoreAvg.avg_score;

    `,
      [storeActivityId]
    );
    return result;
  } catch (err) {
    const error = new Error("DATASOURCE_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

const prviteActivityDetail = async function (userId, storeActivityId) {
  try {
    const targetIds = await dataSource.query(
      `
          SELECT 
            target_id
          FROM 
            likes l
            LEFT JOIN users u ON l.user_id = u.id
          WHERE u.id = ?
          `,
      [userId]
    );

    const targetIdValue = targetIds.map((row) => row.target_id);
    const targetIdValues = `(${targetIdValue.join(", ")})`;
    const correct = (storeActivityId) => {
      return targetIdValues.includes(storeActivityId) ? 1 : 0;
    };

    const [result] = await dataSource.query(
      `
          SELECT
            sa.id AS storeActivityId,
            a.name AS activityName,
            s.spot_id AS spotId,
            s.name AS StoreName,
            s.phone_number AS phoneNumber,
            s.post_number AS postNumber,
            sa.per_price AS price,
            CONCAT(s.city, ' ', s.district) AS storeAddress, 
            s.description,
            ROUND(scoreAvg.avg_score, 1) AS scoreAvg,
            JSON_ARRAYAGG(sai.image) AS imageUrls,
            ${correct(storeActivityId)} AS likes
          FROM
            store_activities sa
            LEFT JOIN stores s ON sa.store_id = s.id
            LEFT JOIN activities a ON a.id = sa.activity_id
            LEFT JOIN (
              SELECT store_activity_id, AVG(score) AS avg_score
              FROM store_activity_reviews
              GROUP BY store_activity_id
            ) scoreAvg ON scoreAvg.store_activity_id = sa.id
            LEFT JOIN (
              SELECT
                store_activity_id,
                image
              FROM store_activity_images
            ) sai ON sai.store_activity_id = sa.id
          WHERE sa.id = ?
          GROUP BY sa.id, a.name, s.spot_id, s.name, s.phone_number, s.post_number, s.city, s.district, s.description, scoreAvg.avg_score;
          `,
      [storeActivityId]
    );

    return result;
  } catch (err) {
    const error = new Error("DATASOURCE_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { publicActivityDetail, prviteActivityDetail };
