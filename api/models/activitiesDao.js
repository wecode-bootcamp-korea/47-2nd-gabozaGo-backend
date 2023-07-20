const dataSource = require("./dataSource");

const getAllActivities = async () => {
  const result = await dataSource.query(
    `SELECT
    id,
    name
    FROM activities`
  );
  return result;
};

module.exports = {
  getAllActivities,
};