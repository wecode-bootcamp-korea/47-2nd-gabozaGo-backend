const dataSource = require("./dataSource");

const getAllSpots = async () => {
  const result = await dataSource.query(
    `SELECT
    id,
    name
    FROM spots`
  );
  return result;
};

module.exports = {
  getAllSpots,
};
