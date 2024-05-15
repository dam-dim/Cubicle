const router = require("express").Router();
const cubeService = require("../services/cubeService");

router.get("/", async (req, res) => {
  const { search, from, to } = req.query;

  // TODO: Implement mongoose search

  const cubes = await cubeService.getAllCubes(search, from, to);
  res.render("index", { cubes, search, from, to });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  const error = req.cookies["error"];
  res.clearCookie("error");

  res.status(404).render("404", { error });
});

module.exports = router;
