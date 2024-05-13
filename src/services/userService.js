const User = require("../models/User");

exports.register = (credentials) => {
  return User.create(credentials);
};
