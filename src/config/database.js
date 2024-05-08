const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const { getAllCubes } = require("../services/cubeService");

module.exports = () => {
  let initialCubes = [
    {
      id: uniqid(),
      name: "Gan356 Air SM",
      imageUrl:
        "https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg",
      difficulty: 3,
      description: "Cube 1",
    },
    {
      id: uniqid(),
      name: "Eco-Dark",
      imageUrl:
        "https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg",
      difficulty: 6,
      description: "Cube 2",
    },
    {
      id: uniqid(),
      name: "Pyraminx",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg",
      difficulty: 1,
      description: "Cube 3",
    },
    {
      id: uniqid(),
      name: "Megaminx",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg",
      difficulty: 4,
      description: "Cube 4",
    },
  ];

  if (!getAllCubes().length) {
    fs.writeFileSync(
      path.resolve(__dirname, "../database/database.json"),
      JSON.stringify(initialCubes),
      "utf-8",
      (err) => {
        if (err) {
          console.log("Error in populating database! >> database ");
        }
      }
    );
  }
};
