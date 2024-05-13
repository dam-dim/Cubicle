const router = require("express").Router();

router.get("/login", (req, res) => {
  // TODO
  res.render("user/login");
});

router.post("/login", (req, res) => {
  // TODO
});

router.get("/register", (req, res) => {
  // TODO
  res.render("user/register");
});

router.post("/register", (req, res) => {
  // TODO
});

module.exports = router;
