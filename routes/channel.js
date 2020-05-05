const express = require("express");
const router = express.Router();
const server = require("../models/Server");
const channel = require("../models/Channel");
const message = require("../models/Message");
const passport = require("passport");
const axios = require("axios");
const cheerio = require("cheerio");
const validator = require("validator");

//@route POST channel/create
//@desc create channel
//@access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { serverID, channelName, channelType } = req.body;
    if (!serverID)
      return res.status(400).json({ channel: "Server ID is required" });
    if (!channelName || channelName.trim() == "")
      return res.status(400).json({ channel: "Channel Name is required" });
    if (!validator.isLength(channelName, { min: 4, max: 64 }))
      return res
        .status(400)
        .json({ server: "Channel name must be between 4 to 64 characters" });
    if (!channelType || channelType.trim() == "")
      return res.status(400).json({ channel: "Channel Type is required" });
    if (
      channelType != "text" &&
      channelType != "audio" &&
      channelType != "video"
    ) {
      return res.status(400).json({ channel: "Invalid Channel type" });
    }
    let about;
    if (req.body.about && req.body.about.trim() != "") {
      about = req.body.about;
    }
    server
      .findById(serverID)
      .then((foundServer) => {
        const newChannel = new Channel({
          name: channelName,
          type: channelType,
          about: about,
        });
        newChannel.save().then(() => {
          foundServer.channels.push(newChannel);
          foundServer.save().then(() => {
            res.json({ success: true });
          });
        });
      })
      .catch(() => {
        res.status(400).json({ channel: "Server Not Found" });
      });
  }
);

//@route POST channel/delete
//@desc delete channel
//@access Private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { serverID, channelID } = req.body;
    if (!serverID)
      return res.status(400).json({ channel: "Server ID is required" });
    if (!channelID)
      return res.status(400).json({ channel: "Channel ID is required" });
    server.findById(serverID).then((foundServer) => {
      if (foundServer.creator != req.user.id)
        return res.status(401).json({ Unauthorized: true });
      if (!foundServer.channels.includes(channelID))
        return res.status(404).json({ channelNotFound: "Channel Not Found" });
      channel.findByIdAndRemove(channelID).then(() => {
        foundServer.channels.splice(foundServer.channels.indexOf(channelID), 1);
        foundServer.save().then(() => {
          res.json({ success: true });
        });
      });
    });
  }
);

//@route POST channel/message
//@desc get channel messages
//@access Private
router.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    channel
      .findById(req.body.channelID)
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: ["username", "profilePicture"],
        },
        limit: 50,
      })
      .then((foundChannel) => {
        res.json(foundChannel.messages);
      });
  }
);

//@route POST channel/message/send
//@desc send message in a channel
//@access Private
router.post(
  "/message/send",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.message)
      return res.status(400).json({ messageError: "Message is needed" });
    if (req.body.message.trim().length == 0)
      return res
        .status(400)
        .json({ messageError: "Cannot send an empty message" });
    channel.findById(req.body.channelID).then((foundChannel) => {
      const message = new Message({
        sender: req.user.id,
        content: req.body.message,
      });
      foundChannel.messages.push(message);
      message.save().then(() => {
        foundChannel.save().then(() => {
          res.json({ success: true });
        });
      });
    });
  }
);

router.post("/message/meta", (req, res) => {
  axios.get(req.body.url).then((response) => {
    const $ = cheerio.load(response.data);
    const title = $("meta[property='og:title']");
    const image = $("meta[property='og:image']");
    const description = $("meta[property='og:description']");
    const siteName = $("meta[property='og:site_name']");
    const resposeObject = {};
    if (!title[0]) {
      resposeObject.title = req.body.url;
      return res.json(resposeObject);
    }
    if (title[0].attribs.content)
      resposeObject.title = title[0].attribs.content;
    if (image[0].attribs.content)
      resposeObject.image = image[0].attribs.content;
    if (description[0].attribs.content)
      resposeObject.description = description[0].attribs.content;
    if (siteName[0].attribs.content)
      resposeObject.siteName = siteName[0].attribs.content;
    res.json(resposeObject);
  });
});

module.exports = router;
