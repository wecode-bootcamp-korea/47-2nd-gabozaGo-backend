const { dataSource } = require("../api/models/dataSource");

const truncateTables = async (tableList) => {
  await dataSource.query(`SET FOREIGN_KEY_CHECKS=0`);

  for (let table of tableList) {
    await dataSource.query(`TRUNCATE tabke ${table}`);
    await dataSource.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
  }

  await dataSource.query(`SET FOERIGN_KEY_CHECKS=1`);
  await dataSource.destroy();
};

module.exports = { truncateTables };
