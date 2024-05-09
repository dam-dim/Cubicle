const Accessory = require("../models/Accessory");
const cubeService = require("./cubeService");

exports.createAccessory = async (newAccessory) => {
  const accessory = await Accessory.create(newAccessory);

  return accessory;
};

exports.getAll = () => {
  return Accessory.find();
};

exports.findById = (id) => {
  return Accessory.findById(id);
};

exports.findWithoutOwned = async (cubeId) => {
  // Getting the accessory ids for the cube with cubeId in an array []
  const accessoryIds = await cubeService.getAccessoryIds(cubeId);

  // getting the accessories which ids are not in the passed array
  return Accessory.find({ _id: { $nin: accessoryIds } }).lean();
};
