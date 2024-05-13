const router = require("express").Router();
const userService = require("../services/userService");

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

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  await userService.register({ username, password, repeatPassword });

  res.redirect("/users/register");
});

module.exports = router;
