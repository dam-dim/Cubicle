const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");
const uniqid = require("uniqid");

exports.getAllCubes = async (search, from, to) => {
  let filteredCubes = JSON.parse(await readDatabase());

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

exports.createCube = async (name, description, imageUrl, difficulty) => {
  const newCube = { name, description, imageUrl, difficulty };

  const cubes = await this.getAllCubes();

  newCube["id"] = getRandomId();

  cubes.push(newCube);

  await writeDatabase(cubes);

  return newCube;
};

exports.deleteCube = async (id) => {
  let cubes = await this.getAllCubes();
  const cube = await findCube(id);
  const index = cubes.indexOf(cube);

  cubes = cubes.splice(index, 1);

  await writeDatabase(cubes);
};

exports.updateCube = () => {};

exports.findCube = async (id) => {
  const cubes = await this.getAllCubes();
  let output = {};

  for (const cube of cubes) {
    if (cube.id === id) {
      output = cube;
      break;
    }
  }

  return output;
};

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
