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
      owner: req.user,
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

    const isOwner = req.user ? cube.owner?.toString() === req.user._id : false;

    // TODO: add validation for the cube if present
    res.render("cube/details", { cube, isOwner });
  } catch (e) {
    console.log(e.message);
    res.redirect("/404");
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

router.post("/edit/:cubeId", async (req, res) => {
  const { name, description, imageUrl, difficulty } = req.body;
  const { cubeId } = req.params;
  const payload = {
    name,
    imageUrl,
    difficulty,
    description,
  };

  await cubeService.update(cubeId, payload);

  res.redirect(`/cubes/details/${cubeId}`);
});

router.get("/delete/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await cubeService.findCubeById(cubeId).lean();
  res.render("cube/delete", { cube });
});

router.post("/delete/:cubeId", async (req, res) => {
  // TODO: add functionality for deleting the cube
  const { cubeId } = req.params;

  await cubeService.delete(cubeId);

  res.redirect("/");
});

module.exports = router;
