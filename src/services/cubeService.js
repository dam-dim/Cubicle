const Cube = require("../models/Cube");

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

exports.deleteCube = async (id) => {
  let cubes = await this.getAllCubes();
  const cube = await findCube(id);
  const index = cubes.indexOf(cube);

  cubes = cubes.splice(index, 1);

  await writeDatabase(cubes);
};

exports.updateCube = () => {};

exports.findCubeById = (id) => {
  return Cube.findById(id);
};
