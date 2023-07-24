const dataSource = require("./dataSource");

const createLikes = async (userID, targetId) => {
  await dataSource.query(
    `INSERT INTO likes (
      user_id,
      type,
      target_id
    ) VALUES (?, 'storeActivity', ?)`,
    [userID, targetId]
  );
};

const getLikes = async (userId, targetId) => {
  const result = await dataSource.query(
    `SELECT 
      id,
      user_id,
      type,
      target_id
    FROM likes
    WHERE user_id = ?
    AND target_id = ?`,
    [userId, targetId]
  );
  return result;
};

const deleteLikes = async (userId, targetId) => {
  await dataSource.query(
    `DELETE FROM likes
    WHERE user_id = ?
    AND target_id = ?`,
    [userId, targetId]
  );
};

const getUserLikes = async (userId) => {
  const result = await dataSource.query(
    `SELECT 
    likes.target_id AS storeActivityId,
    stores.name AS storeName,
    spots.name AS spotName,
    store_activities.per_price AS perPrice,
    activities.name AS activityName,
    (SELECT image FROM store_activity_images WHERE store_activity_id = likes.target_id LIMIT 1) AS image
FROM 
    likes 
JOIN 
    store_activities ON likes.target_id = store_activities.id
JOIN
    activities ON store_activities.activity_id = activities.id
JOIN
    stores ON store_activities.store_id = stores.id
JOIN
    spots ON stores.spot_id = spots.id
WHERE 
    likes.user_id = ?`,
    [userId]
  );
  return result;
};

module.exports = {
  getLikes,
  createLikes,
  deleteLikes,
  getUserLikes,
};
