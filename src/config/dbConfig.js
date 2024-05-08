const mongoose = require("mongoose");

// Make the URL in separate constants file
const URL = "mongodb://localhost:27017/cubicles-jsweb-softuni";

async function dbConnect() {
  await mongoose.connect(URL);
}

module.exports = dbConnect;
