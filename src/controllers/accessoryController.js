const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("createAccessory");
});

router.post("/create", (req, res) => {
  // TODO: implement creation and saving of new accessories
  console.log(req.body.params);

  console.log("Successfully added a new accessory!");
  res.redirect("/");
});

module.exports = router;
