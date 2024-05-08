const Accessory = require("../models/Accessory");

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
