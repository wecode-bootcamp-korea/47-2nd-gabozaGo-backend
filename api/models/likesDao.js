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

module.exports = {
  createLikes,
  getLikes,
  deleteLikes,
};
