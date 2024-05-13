const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");

router.get("/create", async (req, res) => {
  res.render("cube/create");
});

router.post("/create", async (req, res) => {
  const { name, description, difficulty, imageUrl } = req.body;

  try {
    await cubeService.createCube({
      name,
      description,
      imageUrl,
      difficulty,
    });
  } catch (e) {
    console.log(e.message);
  }

  res.redirect("/");
});

router.get("/details/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;

  try {
    const cube = await cubeService
      .findCubeById(cubeId)
      .populate("accessories")
      .lean();

    // TODO: add validation for the cube if present
    res.render("cube/details", { cube });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/attach-accessory/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await cubeService.findCubeById(cubeId).lean();

  // getting the accessories which the cube with cubeId does not own
  const accessories = await accessoryService.findWithoutOwned(cubeId);

  const hasAccessories = accessories.length > 0;

  res.render("cube/attachAccessory", { cube, accessories, hasAccessories });
});

router.post("/attach-accessory/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const accessoryId = req.body.accessory;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/details/${req.params.cubeId}`);
});

router.get("/edit/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await cubeService.findCubeById(cubeId).lean();
  res.render("cube/edit", { cube });
});

router.post("/edit/:cubeId", (req, res) => {
  // TODO: add functionality for edidting the cube
  res.render("cube/edit");
});

router.get("/delete/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await cubeService.findCubeById(cubeId).lean();
  res.render("cube/delete", { cube });
});

router.post("/delete/:cubeId", (req, res) => {
  // TODO: add functionality for deleting the cube
  res.render("cube/delete");
});

module.exports = router;
