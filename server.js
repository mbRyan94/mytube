const express = require("express");
const db = require("./src/db/sequelize");

db.authenticate()
  .then((err) => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({
    message: "test route works",
  });
});

app.listen(PORT, () => console.info(`Server is running on PORT ${PORT}...`));
