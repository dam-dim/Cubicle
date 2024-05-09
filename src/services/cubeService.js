const Cube = require("../models/Cube");
const accessoryService = require("./accessoryService");

exports.getAllCubes = async (search, from, to) => {
  let filteredCubes = await Cube.find().lean();

  // TODO: this can be filtered with mongoose
  if (search) {
    filteredCubes = filteredCubes.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (from) {
    filteredCubes = filteredCubes.filter(
      (cube) => cube.difficulty >= Number(from)
    );
  }

  if (to) {
    filteredCubes = filteredCubes.filter(
      (cube) => cube.difficulty <= Number(to)
    );
  }

  return filteredCubes;
};

exports.createCube = async (cubeData) => {
  const cube = await Cube.create(cubeData);

  // const cube = new Cube(cubeData);
  // await cube.save();

  return cube;
};

exports.findCubeById = (id) => {
  return Cube.findById(id);
};

exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await this.findCubeById(cubeId);

  const hasAccessory = cube.accessories.includes(accessoryId);

  if (!hasAccessory) {
    cube.accessories.push(accessoryId);
    return cube.save();
  }
};

exports.getAllAccessories = async (cubeId) => {
  const cube = await Cube.findById(cubeId).populate("accessories").lean();

  return cube.accessories;
};

exports.getAccessoriesNotPresent = async (cubeId) => {
  // TODO
  let accessories = [];
  const cube = await Cube.findById(cubeId).populate("accessories").lean();
  const cubeAccessories = cube.accessories ? cube.accessories : [];
  const allAccessories = await accessoryService.getAll().lean();

  console.log(cubeAccessories[0], allAccessories[0]);

  for (const accessory of allAccessories) {
    if (!cubeAccessories.includes(accessory)) {
      accessories.push(accessory);
    }
  }

  return accessories;
};

exports.getAccessoryIds = async (cubeId) => {
  let ids = [];
  const cube = await Cube.findById(cubeId).lean();

  if (cube.accessories) {
    cube.accessories.forEach((accessory) => {
      console.log(accessory.toString());
      ids.push(accessory.toString());
    });
  }

  return ids;
};
