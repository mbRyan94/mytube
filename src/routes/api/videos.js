const express = require("express");

const YoutubeService = require("../../youtube-service");
const { getAllChannelsFromDb } = require("../../db/query");
const videoMockData = require("../../utils/video-mock");
const router = express.Router();

router.get("/mock", async (req, res) => {
  const mock = await videoMockData;
  console.log("mock data: ", mock);
  return res.json({ data: mock });
});

router.get("/", async (req, res) => {
  try {
    const channelData = [];
    const channelsFromDb = await getAllChannelsFromDb();

    if (channelsFromDb.length == 0) {
      return json({
        code: 404,
        success: false,
        message: e.message,
      });
    }
    for (let i = 0; i < channelsFromDb.length; i++) {
      console.log("channelId: ", channelsFromDb[i].dataValues.channelId);
      console.log("channelTitle: ", channelsFromDb[i].dataValues.channelTitle);
      console.log("channelTumbnail: ", channelsFromDb[i].dataValues.thumbnail);

      let channelId = channelsFromDb[i].dataValues.channelId;
      let channelTitle = channelsFromDb[i].dataValues.channelTitle;
      let channelThumbnailUrl = channelsFromDb[i].dataValues.thumbnail;

      channelData.push({
        channelId: channelId,
        channelTitle: channelTitle,
        channelThumbnailUrl: channelThumbnailUrl,
      });
    }
    console.log("channelData: ", channelData);
    let ytData = [];

    for (let i = 0; i < channelData.length; i++) {
      let channelId = channelData[i].channelId;
      let channelTitle = channelData[i].channelTitle;
      let channelThumbnailUrl = channelData[i].channelThumbnailUrl;

      let videoData = await YoutubeService.getlatestVideosByChannelId(
        channelId
      );
      if (!videoData)
        return res.json({
          success: false,
          code: 404,
          message: "resource not found",
        });

      console.log(videoData);
      console.log("videoId form yt: ", videoData[0].id.videoId);
      let videos = [];
      for (let i = 0; i < videoData.length; i++) {
        videos.push({
          id: videoData[i].id.videoId,
          title: videoData[i].snippet.title,
          description: videoData[i].snippet.description,
          thumbnail: {
            url: videoData[i].snippet.thumbnails.medium,
          },
        });
      }
      ytData.push({
        channelId: channelId,
        channelTitle: channelTitle,
        channelThumbnailUrl: channelThumbnailUrl,
        videos: videos,
      });
    }
    console.log("ytData: ", ytData);

    return res.json(ytData);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
