const queryBuilder = require("./queryBuilder");
const dataSource = require("./dataSource");

const defaultActivityList = async function (spotIds, limit, offset) {
  try {
    const sortingQuery = queryBuilder.sortingBuilder();
    const paginationQuery = queryBuilder.paginationBuilder(limit, offset);
    const whereCondition = spotIds.length > 1 ? `s.spot_id IN (${spotIds.join(",")})` : `s.spot_id = ?`;
    const result = await dataSource.query(
      `SELECT
      a.id AS activityId,
      a.name AS activityName,
      (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'storeActivityId', s2.storeActivityId,
                  'spotId', s2.spot_id,
                  'storeName', s2.name,
                  'scoreAvg', ROUND(s2.scoreAvg, 1),
                  'Image', s2.image
              )
          )
          FROM (
              SELECT DISTINCT
                  s.id,
                  sa.id AS storeActivityId,
                  s.spot_id,
                  s.name,
                  (
                      SELECT AVG(score)
                      FROM store_activity_reviews sar
                      WHERE sar.store_activity_id = sa.id
                  ) AS scoreAvg,
                  sai.image
              FROM stores s
              JOIN store_activities sa ON sa.store_id = s.id AND sa.activity_id = a.id
              LEFT JOIN (
                  SELECT
                      store_activity_id,
                      image
                  FROM store_activity_images
              ) sai ON sai.store_activity_id = sa.id 
              WHERE ${whereCondition}
              ${sortingQuery}
              ${paginationQuery}
          ) AS s2
          WHERE MOD(
              CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(s2.image, '_', -1), '.', 1) AS UNSIGNED),
              2
          ) = 1
      ) AS stores
  FROM activities a;
`,
      spotIds
    );
    return result;
  } catch (err) {
    throw new DatabaseError("DATABASE_ERROR");
  }
};

const userActivityList = async function (userId, spotId, limit, offset) {
  try {
    const sortingQuery = queryBuilder.sortingBuilder();
    const paginationQuery = queryBuilder.paginationBuilder(limit, offset);
    const getUserSpotId = async function (userId) {
      const result = await dataSource.query(
        `
      SELECT 
        us.spot_id AS userSpotId
      FROM
        user_spots us 
        LEFT JOIN users u ON us.user_id = u.id
      WHERE u.id = ?
    `,
        [userId]
      );
      return result;
    };

    const userspotId = spotId ? spotId : (await getUserSpotId(userId))[0]?.userSpotId;

    const storeActivityList = await dataSource.query(
      `  SELECT
      a.id AS activityId,
      a.name AS activityName,
      (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'storeActivityId', s2.id,
                  'spotId', s2.spot_id,
                  'storeName', s2.name,
                  'scoreAvg', ROUND(s2.scoreAvg, 1),
                  'Image', s2.image
              )
          )
          FROM (
              SELECT
                  s.id,
                  s.spot_id,
                  s.name,
                  (
                      SELECT AVG(score)
                      FROM store_activity_reviews sar
                      WHERE sar.store_activity_id = sa.id
                  ) AS scoreAvg,
                  sai.image 
              FROM stores s
              JOIN store_activities sa ON sa.store_id = s.id AND sa.activity_id = a.id
              LEFT JOIN store_activity_images sai ON sai.store_activity_id = sa.id
              WHERE s.spot_id = ?
              ${sortingQuery}
              ${paginationQuery}
          ) AS s2
          WHERE MOD(
            CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(s2.image, '_', -1), '.', 1) AS UNSIGNED),
            2
        ) = 1
      ) AS stores
  FROM activities a
  LEFT JOIN user_activities ua ON a.id = ua.activity_id
  LEFT JOIN users u ON ua.user_id = u.id
  WHERE u.id = ?
  ORDER BY a.id ASC;
`,
      [userspotId, userId]
    );
    return storeActivityList;
  } catch {
    throw new DatabaseError("DATABASE_ERROR");
  }
};

module.exports = {
  defaultActivityList,
  userActivityList,
};
