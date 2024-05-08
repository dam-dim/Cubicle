const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("accessory/create");
});

router.post("/create", (req, res) => {
  // TODO: implement creation and saving of new accessories
  const accessory = { ...req.body };
  console.log(accessory);

  console.log("Successfully added a new accessory!");
  res.redirect("/accessory/create");
});

module.exports = router;
