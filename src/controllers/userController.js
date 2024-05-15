const router = require("express").Router();
const userService = require("../services/userService");
const { isAuth, isNotAuth } = require("../middlewares/authMiddleware");

router.get("/login", isNotAuth, (req, res) => {
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

  try {
    await userService.register({
      username,
      password,
      repeatPassword,
    });

    res.redirect("/users/login");
  } catch (error) {
    console.log(error.message);

    res.cookie("error", error.message, { httpOnly: true });

    res.redirect("/404");
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");

  res.redirect("/");
});

module.exports = router;
