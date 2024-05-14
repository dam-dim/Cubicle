const router = require("express").Router();
const userService = require("../services/userService");
const { isAuth, isNotAuth } = require("../middlewares/authMiddleware");

router.get("/login", isNotAuth, (req, res) => {
  const { user } = req;
  console.log({ user });

  res.render("user/login");
});

router.post("/login", isNotAuth, async (req, res) => {
  // TODO
  const { username, password } = req.body;
  const credentials = { username, password };

  const token = await userService.login(credentials);

  res.cookie("auth", token, { httpOnly: true });

  res.redirect("/");
});

router.get("/register", isNotAuth, (req, res) => {
  res.render("user/register");
});

router.post("/register", isNotAuth, async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  await userService.register({
    username,
    password,
    repeatPassword,
  });

  res.redirect("/users/login");
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");

  res.redirect("/");
});

module.exports = router;
