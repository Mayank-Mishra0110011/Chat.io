const express = require("express");
const router = express.Router();
const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateProfileUpdateInput = require("../validation/profile");
const passport = require("passport");

//@route POST user/register
//@desc register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  req.body.email = req.body.email.trim().toLowerCase();
  user.findOne({ username: req.body.username }).then((foundUserByUsername) => {
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
    user.findById(req.user.id).then((foundUser) => {
      if (foundUser.lastStatus) foundUser.status = foundUser.lastStatus;
      foundUser.save().then((foundUser) => {
        res.json({
          username: foundUser.username,
          profilePicture: foundUser.profilePicture,
          status: foundUser.status,
          micEnabled: foundUser.micEnabled,
          audioEnabled: foundUser.audioEnabled,
          email: foundUser.email,
        });
      });
    });
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

module.exports = router;
