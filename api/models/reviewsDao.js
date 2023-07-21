const dataSource = require("./dataSource");

const getReviews = async (storeActivityId) => {
  const result = await dataSource.query(
    ` SELECT 
        store_activity_reviews.id,
        users.name,
        users.profile_image AS profileImage,
        store_activity_reviews.score AS rating,
        store_activity_reviews.description AS userComment,
        store_activity_review_images.image AS images
      FROM 
        store_activity_reviews
      JOIN 
        users ON store_activity_reviews.user_id = users.id
      LEFT JOIN
        store_activity_review_images ON store_activity_reviews.id = store_activity_review_images.store_activity_review_id
      WHERE
        store_activity_reviews.store_activity_id = ?`,
    [storeActivityId]
  );
  return result;
};

module.exports = {
  getReviews,
};
