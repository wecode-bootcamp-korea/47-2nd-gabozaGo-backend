const scheduler = require("node-schedule");
const dataSource = require("../models/dataSource");

const currentDateMaker = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  return currentDate;
};

const updateReservationDay = async (currentDate) => {
  await dataSource.query(
    `
      UPDATE orders
      SET reservation_status = "reservationDay", deleted_at = NULL
      WHERE order_status = "approved" AND date = ?
    `,
    [currentDate]
  );
};

const updateAfterReservation = async (currentDate) => {
  await dataSource.query(
    `
      UPDATE orders
      SET reservation_status = "afterReservation", deleted_at = NULL
      WHERE order_status = "approved" AND reservation_status = "reservationDay" AND date < ?
    `,
    [currentDate]
  );
};

const reservationStatusUpdater = scheduler.scheduleJob(
  "1 0 * * *",
  async () => {
    const currentDate = await currentDateMaker();

    await updateReservationDay(currentDate);

    await updateAfterReservation(currentDate);
  }
);

module.exports = { reservationStatusUpdater };
