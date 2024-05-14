const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = (credentials) => {
  return User.create(credentials);
};

exports.login = async (credentials) => {
  //
  const user = await User.findOne({ username: credentials.username });

  if (!user) {
    throw new Error("Invalid username or password!");
  }

  const isValid = await bcrypt.compare(credentials.password, user.password);
  console.log(isValid);

  if (!isValid) {
    throw new Error("Invalid username or password!");
  }

  return user;
};
