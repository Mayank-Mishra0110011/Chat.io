const express = require("express");
const router = express.Router();
const server = require("../models/Server");
const channel = require("../models/Channel");
const passport = require("passport");
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
      .then(foundServer => {
        const newChannel = new Channel({
          name: channelName,
          type: channelType,
          about: about
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
    server.findById(serverID).then(foundServer => {
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

module.exports = router;
