const router = require("express").Router();
const { createCube, findCube } = require("../services/cubeService");

router.get("/create", async (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, difficultyLevel, imageUrl } = req.body;

  await createCube(name, description, imageUrl, difficultyLevel);

  res.redirect("/");
});

router.get("/details/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await findCube(cubeId);
  res.render("details", { cube });
});

router.get("/attach-accessory/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await findCube(cubeId);
  res.render("attachAccessory", { cube });
});

router.post("/attach-accessory/:cubeId", (req, res) => {
  res.redirect(`/cubes/details/${req.params.cubeId}`);
});

module.exports = router;
