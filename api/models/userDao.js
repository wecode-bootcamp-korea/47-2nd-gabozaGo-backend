const dataSource = require("./dataSource");

const getUserBySocialId = async (socialId) => {
  const result = await dataSource.query(
    `SELECT
        id,
        social_platform_id,
        signup_status
      FROM
        users
      WHERE social_platform_id = ?`,
    [socialId]
  );
  return result;
};

const getUserById = async (id) => {
  const [user] = await dataSource.query(
    `SELECT
        id,
        name,
        social_platform,
        social_platform_id AS socialId,
        phone_number,
        point
      
      FROM
        users
      WHERE id = ?`,
    [id]
  );
  return user;
};

const signUp = async (name, socialId, profileImage) => {
  await dataSource.query(
    `INSERT INTO users
      (name,
        social_platform_id,
        profile_image)
      VALUES (?,?,?)`,
    [name, socialId, profileImage]
  );
};

module.exports = {
  getUserBySocialId,
  signUp,
  getUserById,
};
