const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const SECRET = "My Secret"; // <--- This can be in separate file

exports.register = (credentials) => {
  return User.create(credentials);
};

exports.login = async (credentials) => {
  const user = await User.findOne({ username: credentials.username });

  if (!user) {
    throw new Error("Invalid username or password!");
  }

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (!isValid) {
    throw new Error("Invalid username or password!");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
};
