const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileUpdateInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  if (
    !validator.isEmpty(data.username) &&
    !validator.isLength(data.username, { min: 4, max: 8 })
  ) {
    errors.username = "Username must be 4 to 8 characters long";
  }
  if (!validator.isEmpty(data.email) && !validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
