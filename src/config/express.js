const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const router = require("./router");

module.exports = (app) => {
  // TODO: Logging the path and method
  // app.use((req, res, next) => {
  //   console.log(`Method: ${req.method}, Path: ${req.path}`);
  //   next();
  // });

  // TODO: Setup the View Engine
  app.engine("hbs", handlebars.engine({ extname: "hbs" }));
  app.set("view engine", "hbs");
  app.set("views", "src/views");

  // TODO: Setup the body parser
  app.use(express.urlencoded({ extended: false }));

  // TODO: Setup the static files
  app.use(express.static(path.resolve(__dirname, "../../public")));

  // TODO: Setup the router
  app.use(router);
};
