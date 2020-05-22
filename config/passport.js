const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("./keys");
const user = mongoose.model("user");
const options = {};
options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretKey;

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(options, (jwtPayload, done) => {
      user
        .findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
