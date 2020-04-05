const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();

module.exports = new Sequelize(process.env.DB_URI);
