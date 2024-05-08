const env = process.env.NODE_ENV || "development";

const config = require("./config/config")[env];
const express = require("express");
const expressConfig = require("./config/express");
const dbConnect = require("./config/dbConfig");

// Local Variables
const app = express();

// Configs
expressConfig(app);

// Connecting to the DB
dbConnect()
  .then(console.log(`Successfully connected to DB ...`))
  .catch((err) => console.log(`Error while connecting to DB ${err}`));

// Port
app.listen(config.port, () =>
  console.log(`Server is listening on port: ${config.port} ...`)
);
