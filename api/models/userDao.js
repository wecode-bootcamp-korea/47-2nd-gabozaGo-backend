const dataSource = require("./dataSource");

const updateUserInfo = {
  async execute(
    userId,
    userSpot,
    userActivities,
    { socialPlatform, phoneNumber }
  ) {
    const queryRunner = await dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      await queryRunner.query(
        `UPDATE users
         SET social_platform = ?, phone_number = ?, signup_status = 1, point = 500000
         WHERE id = ?`,
        [socialPlatform, phoneNumber, userId]
      );

      await queryRunner.query(
        `INSERT INTO user_spots(user_id, spot_id)
         VALUES (?, ?)`,
        [userId, userSpot]
      );

      for (const activityId of userActivities) {
        await queryRunner.query(
          `INSERT INTO user_activities(user_id, activity_id)
           VALUES (?, ?)`,
          [userId, activityId]
        );
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  },
};

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

const getUserInfo = async (userId) => {
  const result = await dataSource.query(
    `SELECT
      users.id,
      users.name,
      users.phone_number AS phoneNumber,
      users.point,
      JSON_OBJECT('id', ANY_VALUE(spots.id), 'name', ANY_VALUE(spots.name)) AS spot,
      JSON_ARRAYAGG(JSON_OBJECT('id', activities.id, 'name', activities.name)) AS activities
    FROM
      users
    LEFT JOIN user_spots ON users.id = user_spots.user_Id
    LEFT JOIN spots ON user_spots.spot_id = spots.id
    LEFT JOIN user_activities ON users.id = user_activities.user_Id
    LEFT JOIN activities ON user_activities.activity_id = activities.id
    WHERE users.id = ?
    GROUP BY users.id, users.name, users.phone_number, users.point`,
    [userId]
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
  updateUserInfo,
  getUserInfo,
};
