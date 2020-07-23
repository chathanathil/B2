const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateEmailInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
