const caringTypesmodule = require("../modules/caringTypes.module");

const getAllCaringTypes = async () => {
  try {
    const cTypes = await caringTypesmodule.find({}, { __v: 0 });
    return cTypes;
  } catch (error) {
    console.error("Error getting cTypes");
    return [];
  }
};

const addNewCType = async (data) => {
  const name = data.name ? data.name : "";
  const description = data.description ? data.description : "";
  const cType = new caringTypesmodule({
    name,
    description,
  });

  const result = await cType.save();
  return result;
};

const getCaringType = async (id) => {
  try {
    const cType = await caringTypesmodule.findOne({ _id: id }, { __v: 0 });
    return cType;
  } catch (error) {
    console.error("Error getting one cType");
    return [];
  }
};

const removeCaringType = async (id) => {
  try {
    const removedCType = await caringTypesmodule.deleteOne({ _id: id });
    return true;
  } catch (error) {
    console.error("Error removing cType", error);
    return false;
  }
};

const updateCaringType = async (id, payload) => {
  try {
    const oneCType = await getCaringType(id);
    const name = payload.name ? payload.name : oneCType.name;
    const description = payload.description
      ? payload.description
      : oneCType.description;
    const newCaringType = await caringTypesmodule.updateOne(
      { _id: id },
      { $set: { name, description } }
    );
    return newCaringType;
  } catch (error) {
    console.error("Error updating cType", error);
    return false;
  }
};

const searchCType = async (searchValue) => {
  try {
    const caringTypes = await caringTypesmodule.find({
      $or: [{ name: searchValue }, { description: searchValue }],
    });

    return caringTypes;
  } catch (error) {
    console.error(error, "Error searching Caring Types,,,");
    return [];
  }
};

module.exports = {
  getAllCaringTypes,
  getCaringType,
  removeCaringType,
  updateCaringType,
  addNewCType,
  searchCType,
};
