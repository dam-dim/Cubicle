const env = process.env.NODE_ENV || "development";

const config = require("./config/config")[env];
const express = require("express");
const expressConfig = require("./config/express");

const app = express();

const main = () => {
  expressConfig(app);

  app.listen(config.port, () =>
    console.log(`Server is listening on port: ${config.port}...`)
  );
};

main();
