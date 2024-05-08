const router = require("express").Router();
const Accessory = require("../models/Accessory");
const accessoryService = require("../services/accessoryService");

router.get("/create", (req, res) => {
  res.render("accessory/create");
});

router.post("/create", async (req, res) => {
  const newAccessory = { ...req.body };

  await accessoryService.createAccessory(newAccessory);
  res.redirect("/");
});

module.exports = router;
