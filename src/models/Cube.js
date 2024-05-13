const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  difficulty: Number,
  description: String,
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory",
    },
  ],
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
