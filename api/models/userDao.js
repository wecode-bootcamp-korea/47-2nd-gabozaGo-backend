const dataSource = require("./dataSource");

const updateUserInfo = {
  async execute(userId, userSpot, userActivities, { socialPlatform, phoneNumber }) {
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
};
