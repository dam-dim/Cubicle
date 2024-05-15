const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is required!"],
    minLength: [5, "Username must be at least 5 characters!"],
    match: [
      /^[A-Za-z0-9]+$/,
      "Username is not with english characters and digits only!",
    ],
    unique: [true, "Username already exists!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [8, "Password must be at least 8 characters!"],
    validate: {
      validator: function () {
        return /^[A-Za-z0-9]+$/.test();
      },
      message: "Password is not with english characters and digits only!",
    },
  },
});

// TODO: If the user already exists throw error
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password mismatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
