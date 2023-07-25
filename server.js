require("dotenv").config();

const { createApp } = require("./app");
const DataSource = require("./api/models/dataSource");
const { reservationStatusUpdater } = require("./api/utils/dbUpdater");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    console.log(`server listening on port ${PORT}`);
    await DataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err);
      });
  });

  reservationStatusUpdater;
};

startServer();
