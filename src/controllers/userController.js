const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", (req, res) => {
  // TODO
  const { username, password } = req.body;
  const credentials = { username, password };

  res.redirect("/users/login");
});

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", (req, res) => {
  // TODO
  const { username, password, repeatPassword } = req.body;
  const credentials = { username, password, repeatPassword };

  res.redirect("/users/register");
});

module.exports = router;
