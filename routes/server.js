const express = require("express");
const router = express.Router();
const server = require("../models/Server");
const channel = require("../models/Channel");
const user = require("../models/User");
const passport = require("passport");
const validator = require("validator");

//@route POST server/create
//@desc create server
//@access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user.findById(req.user.id).then(foundUser => {
      if (!req.body.serverName)
        return res.status(400).json({ server: "Server name is required" });
      if (req.body.serverName.trim() == "")
        return res.status(400).json({ server: "Server name is required" });
      if (!validator.isLength(req.body.serverName, { min: 4, max: 64 }))
        return res
          .status(400)
          .json({ server: "Server name must be between 4 to 64 characters" });
      let image;
      if (req.body.image) image = req.body.image;
      const channel1 = new Channel({
        type: "text",
        name: "general"
      });
      const channel2 = new Channel({
        type: "audio",
        name: "general"
      });
      const channel3 = new Channel({
        type: "video",
        name: "general"
      });
      const newServer = new Server({
        name: req.body.serverName,
        image: image,
        selectedChannel: channel1
      });
      newServer.admins.push(req.user.id);
      newServer.members.push(req.user.id);
      newServer.channels.push(channel1);
      newServer.channels.push(channel2);
      newServer.channels.push(channel3);
      channel1.save().then(() => {
        channel2.save().then(() => {
          channel3.save().then(() => {
            newServer.save().then(() => {
              foundUser.servers.unshift(newServer);
              foundUser.save().then(() => {
                res.json({ suceess: true });
              });
            });
          });
        });
      });
    });
  }
);

//@route GET server/
//@desc get user's servers
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .populate({
        path: "servers",
        populate: { path: "channels", select: ["type", "name", "about"] }
      })
      .then(foundUser => {
        res.json(foundUser.servers);
      });
  }
);

//@route GET server/channel
//@desc get selected channel
//@access Private
router.get(
  "/channel",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    server.findById(req.body.serverID).then(foundServer => {
      res.json(foundServer.selectedChannel);
    });
  }
);

//@route POST server/channel
//@desc set selected channel
//@access Private
router.post(
  "/channel",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    server.findById(req.body.serverID).then(foundServer => {
      foundServer.selectedChannel = req.body.channelID;
      foundServer.save().then(() => {
        res.json({ suceess: true });
      });
    });
  }
);

module.exports = router;
