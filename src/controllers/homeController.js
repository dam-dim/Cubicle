const router = require("express").Router();
const cubeService = require("../services/cubeService");

router.get("/", async (req, res) => {
  const { search, from, to } = req.query;

  const cubes = await cubeService.getAllCubes(search, from, to);
  console.log(cubes);
  res.render("index", { cubes, search, from, to });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.status(404).render("404");
});

module.exports = router;
