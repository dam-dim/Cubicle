const path = require("path");
const fs = require("fs/promises");
const uniqid = require("uniqid");
const Cube = require("../models/Cube");

exports.getAllCubes = async (search, from, to) => {
  let filteredCubes = await Cube.find();
  filteredCubes = filteredCubes.map((cube) => cube.toJSON());

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

exports.findCubeById = (id) => Cube.findById(id);

const readDatabase = () => {
  return fs.readFile(
    path.resolve(__dirname, "../database/database.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("Error in reading all cubes! >> cubeService.js");
      }
    }
  );
};

const writeDatabase = (toWrite) => {
  return fs.writeFile(
    path.resolve(__dirname, "../database/database.json"),
    JSON.stringify(toWrite),
    "utf-8",
    (err) => {
      if (err) {
        console.log(
          "Error in writing to the database! >> cubeService.js >> createCube()"
        );
      }
    }
  );
};

const getRandomId = () => {
  return uniqid();
  //return crypto.randomBytes(6).toString("hex");
};
