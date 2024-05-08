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

  // TODO: Check if the accessory is present in the collection
  cube.accessories.push(accessoryId);
  return cube.save();
};

exports.getAllAccessories = async (cubeId) => {
  const cube = await this.findCubeById(cubeId).lean();

  return cube.accessories;
};
