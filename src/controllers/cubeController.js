const router = require("express").Router();
const cubeService = require("../services/cubeService");

router.get("/create", async (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, difficulty, imageUrl } = req.body;

  await cubeService.createCube({
    name,
    description,
    imageUrl,
    difficulty,
  });

  res.redirect("/");
});

router.get("/details/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await cubeService.findCubeById(cubeId);
  res.render("details", { cube });
});

router.get("/attach-accessory/:cubeId", async (req, res) => {
  // TODO
  const cubeId = req.params.cubeId;
  const cube = await cubeService.findCubeById(cubeId);
  res.render("attachAccessory", { cube });
});

router.post("/attach-accessory/:cubeId", (req, res) => {
  // TODO
  res.redirect(`/cubes/details/${req.params.cubeId}`);
});

module.exports = router;
