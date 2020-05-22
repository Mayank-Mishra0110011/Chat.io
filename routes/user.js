const express = require("express");
const router = express.Router();
const user = require("../models/User");
const conversation = require("../models/Conversation");
const message = require("../models/Message");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateProfileUpdateInput = require("../validation/profile");
const passport = require("passport");

const socketRouter = function (io, users) {
  //@route POST user/register
  //@desc register user
  //@access Public
  router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    req.body.email = req.body.email.trim().toLowerCase();
    user
      .findOne({ username: req.body.username })
      .then((foundUserByUsername) => {
        if (foundUserByUsername) {
          errors.username = "Username already taken";
          return res.status(400).json(errors);
        } else {
          user.findOne({ email: req.body.email }).then((foundUserByEmail) => {
            if (foundUserByEmail) {
              errors.email = "Email already exists";
              return res.status(400).json(errors);
            } else {
              const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
              });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save().then(() => {
                    res.json({ success: true });
                  });
                });
              });
            }
          });
        }
      });
  });

  //@route POST user/login
  //@desc login user
  //@access Public
  router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const password = req.body.password;
    const email = req.body.email.trim().toLowerCase();
    user
      .findOne({ email })
      .then((foundUser) => {
        if (!foundUser) {
          throw err;
        }
        bcrypt.compare(password, foundUser.password).then((isEqual) => {
          if (isEqual) {
            const payload = {
              id: foundUser.id,
              username: foundUser.username,
            };
            jwt.sign(
              payload,
              keys.secretKey,
              { expiresIn: 86400 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            );
          } else {
            errors.password = "Password Incorrect";
            return res.status(400).json(errors);
          }
        });
      })
      .catch(() => {
        errors.email = "Email not found";
        res.status(404).json(errors);
      });
  });

  //@route GET user
  //@desc get user data
  //@access Private
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      user
        .findById(req.user.id)
        .populate({
          path: "directMessages.user",
          select: ["username", "profilePicture", "status"],
        })
        .then((foundUser) => {
          if (foundUser.lastStatus) foundUser.status = foundUser.lastStatus;
          foundUser.save().then((foundUser) => {
            res.json({
              username: foundUser.username,
              profilePicture: foundUser.profilePicture,
              status: foundUser.status,
              micEnabled: foundUser.micEnabled,
              audioEnabled: foundUser.audioEnabled,
              email: foundUser.email,
              directMessages: foundUser.directMessages,
            });
          });
        });
    }
  );

  //@route POST user/set/media
  //@desc set media status
  //@access Private
  router.post(
    "/set/media",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      if (req.body.audioEnabled || req.body.micEnabled) {
        user.findById(req.user.id).then((foundUser) => {
          if (req.body.audioEnabled) {
            foundUser.audioEnabled = !foundUser.audioEnabled;
          } else {
            foundUser.micEnabled = !foundUser.micEnabled;
          }
          foundUser.save().then(() => {
            res.json({ success: true });
          });
        });
      } else {
        return res.status(400).json({ status: "Invalid status" });
      }
    }
  );

  //@route POST user/set/status
  //@desc set user status
  //@access Private
  router.post(
    "/set/status",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      user.findById(req.user.id).then((foundUser) => {
        foundUser.status = req.body.status;
        foundUser.save().then(() => {
          res.json({ success: true });
        });
      });
    }
  );

  //@route POST user/info
  //@desc get basic user information
  //@access Public
  router.post("/info", (req, res) => {
    user
      .findById(req.body.id, [
        "username",
        "profilePicture",
        "status",
        "lastStatus",
      ])
      .then((foundUser) => {
        res.json({ info: foundUser });
      });
  });

  //@route POST user/private/offline
  //@desc set user status offline
  //@access Super Private
  router.post("/private/offline", (req, res) => {
    if (!req.body.secretKey || req.body.secretKey != keys.secretKey) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    user.findById(req.body.id).then((foundUser) => {
      foundUser.lastStatus = foundUser.status;
      foundUser.status = "offline";
      foundUser.save().then(() => {
        res.json({ success: true });
      });
    });
  });

  //@route POST user/profile/update
  //@desc updates user profile
  //@access private
  router.post(
    "/profile/update",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProfileUpdateInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      req.body.email = req.body.email.trim().toLowerCase();
      const updateFields = {};
      if (!req.body.email.length == 0) {
        updateFields.email = req.body.email;
      }
      if (!req.body.username.length == 0) {
        updateFields.username = req.body.username;
      }
      if (!req.body.profilePicture.length == 0) {
        updateFields.profilePicture = req.body.profilePicture;
      }
      user
        .findOne({ username: updateFields.username })
        .then((foundUserByUsername) => {
          if (foundUserByUsername) {
            errors.username = "Username already taken";
            return res.status(400).json(errors);
          } else {
            user
              .findOne({ email: updateFields.email })
              .then((foundUserByEmail) => {
                if (foundUserByEmail) {
                  errors.email = "Email already exists";
                  return res.status(400).json(errors);
                } else {
                  user
                    .findOneAndUpdate(
                      { _id: req.user.id },
                      { $set: updateFields },
                      { new: true }
                    )
                    .then(() => {
                      res.json({ success: true });
                    });
                }
              });
          }
        });
    }
  );

  //@route POST user/message
  //@desc get user' direct messages
  //@access Private
  router.post(
    "/message",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      conversation
        .findById(req.body.conversationID)
        .populate({
          path: "messages",
          populate: {
            path: "sender",
            select: ["username", "profilePicture"],
          },
          limit: 50,
        })
        .then((foundConversation) => {
          res.json(foundConversation.messages);
        });
    }
  );

  //@route POST user/dm/add
  //@desc add new conversation to dm
  //@access Private
  router.post(
    "/dm/add",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      if (!req.body.receiverID)
        return res
          .status(400)
          .json({ messageError: "Receiver ID is required" });
      user.findById(req.user.id).then((sender) => {
        user.findById(req.body.receiverID).then((receiver) => {
          const newConversation = new Conversation();
          sender.directMessages.push({
            user: receiver,
            conversation: newConversation,
          });
          receiver.directMessages.push({
            user: sender,
            conversation: newConversation,
          });
          Promise.all([
            newConversation.save(),
            sender.save(),
            receiver.save(),
          ]).then(() => {
            if (users[sender._id]) {
              users[sender._id].socket.emit("conversationCreated", {
                user: {
                  username: receiver.username,
                  profilePicture: receiver.profilePicture,
                  status: receiver.status,
                  _id: receiver._id,
                },
                conversation: newConversation._id,
              });
            }
            if (users[receiver._id]) {
              users[receiver._id].socket.emit("conversationCreated", {
                user: {
                  username: sender.username,
                  profilePicture: sender.profilePicture,
                  status: sender.status,
                  _id: sender._id,
                },
                conversation: newConversation._id,
              });
            }
            res.json({ success: true });
          });
        });
      });
    }
  );

  //@route POST user/message/send
  //@desc send a direct message from one user to another
  //@access Private
  router.post(
    "/message/send",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      if (!req.body.conversationID)
        return res
          .status(400)
          .json({ messageError: "Conversation ID is required" });
      if (!req.body.message)
        return res.status(400).json({ messageError: "Message is needed" });
      if (req.body.message.trim().length == 0)
        return res
          .status(400)
          .json({ messageError: "Cannot send an empty message" });
      const newMessage = new Message({
        sender: req.user.id,
        content: req.body.message,
      });
      conversation
        .findById(req.body.conversationID)
        .then((foundConversation) => {
          foundConversation.messages.push(newMessage);
          Promise.all([newMessage.save(), foundConversation.save()]).then(
            () => {
              res.json({ success: true });
            }
          );
        });
    }
  );
  return router;
};

module.exports = socketRouter;
