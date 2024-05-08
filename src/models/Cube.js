const mongoose = require("mongoose");

// TODO: add collection of Accessories

const cubeSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  difficulty: Number,
  description: String,
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
