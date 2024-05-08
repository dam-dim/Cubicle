const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");

router.get("/create", async (req, res) => {
  res.render("cube/create");
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
  const cube = await cubeService.findCubeById(cubeId).lean();
  res.render("cube/details", { cube });
});

router.get("/attach-accessory/:cubeId", async (req, res) => {
  // TODO
  const cubeId = req.params.cubeId;

  const accessories = await accessoryService.getAll().lean();
  const cube = await cubeService.findCubeById(cubeId).lean();
  const hasAccessories = accessories.length < 0;

  res.render("cube/attachAccessory", { cube, accessories, hasAccessories });
});

router.post("/attach-accessory/:cubeId", (req, res) => {
  // TODO
  res.redirect(`/cubes/details/${req.params.cubeId}`);
});

module.exports = router;
