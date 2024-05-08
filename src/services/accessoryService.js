const Accessory = require("../models/Accessory");

exports.createAccessory = async (newAccessory) => {
  const accessory = await Accessory.create(newAccessory);

  return accessory;
};
