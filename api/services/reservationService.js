const { reservationDao } = require("../models");

const myReservation = async (userId) => {
  return await reservationDao.getReservation(userId);
};

module.exports = { myReservation };
