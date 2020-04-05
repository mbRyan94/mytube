const Sequelize = require("sequelize");
const db = require("./db");

const Channels = db.define("channels", {
  channelTitle: {
    type: Sequelize.STRING,
    field: "channelTitle",
  },
  title: {
    type: Sequelize.STRING,
    field: "title",
  },
  description: {
    type: Sequelize.STRING,
    field: "description",
  },
  thumbnail: {
    type: Sequelize.STRING,
    field: "thumbnail",
  },
});

module.exports = Channels;
