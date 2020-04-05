const express = require("express");
const db = require("./src/db/sequelize");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

db.authenticate()
  .then((err) => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

const app = express();

console.log(process.env.NODE_ENV);
app.get("/", (req, res) => {
  return res.json({
    message: "test route works",
  });
});

app.listen(PORT, () => console.info(`Server is running on PORT ${PORT}...`));
