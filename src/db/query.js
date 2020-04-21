const sequelize = require("sequelize");
const Channel = require("./models");

exports.getAllChannelsFromDb = async () => {
  return await Channel.findAll({
    attributes: ["channelId", "channelTitle", "thumbnail"],
  });
};
