const router = require("express").Router();
const { getAllCubes } = require("../services/cubeService");

router.get("/", async (req, res) => {
  let { search, from, to } = req.query;
  const cubes = await getAllCubes(search, from, to);
  res.render("index", { cubes, search, from, to });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.status(404).render("404");
});

module.exports = router;
