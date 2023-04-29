const caringModule = require("../modules/caring.module");
const CaringType = require("../modules/caringTypes.module");

const getAllCarings = async () => {
  try {
    const caring = await caringModule
      .find({ __v: 0 })
      .populate("nurseId")
      .populate("patientId")
      .populate("caringTypeId");

    return caring;
  } catch (error) {
    console.error(error, "Error loading caings...");
    return [];
  }
};

const addNewCarings = async (params) => {
  try {
    const caring = new caringModule({
      nurseId: params.nurseId,
      caringTypeId: params.caringTypeId,
      patientId: params.patientId,
      time: params.time,
      description: params.description,
    });
    const result = await caring.save();
    return result;
  } catch (error) {
    console.error(error, "Error adding caings...");
    return {};
  }
};

const getOneCaring = async (id) => {
  try {
    const oneCaring = await caringModule.findById({ id: id });
    return oneCaring;
  } catch (error) {
    console.error(error, "Error getting one caing...");
    return {};
  }
};

const getCaringByNurseId = async (nurseId) => {
  try {
    let oneCaring = await getAllCarings();

    oneCaring = oneCaring.filter((caring) => caring.nurseId._id == nurseId);
    return oneCaring;
  } catch (error) {
    console.error(error, "Error getting one caing...");
    return [];
  }
};

const searchCaring = async (searchValue) => {
  try {
    const targetCaring = await CaringType.find({
      $or: [
        { description: searchValue },
        { nurseId: searchValue },
        { patientId: searchValue },
        { caringTypeId: searchValue },
      ],
    });

    return targetCaring;
  } catch (error) {
    console.error(error, "Error searching Caring ,,,");
    return [];
  }
};

const updateCaring = async (caringId, data) => {
  try {
    const oneCaring = await getOneCaring(caringId);
    if (!oneCaring) return false;
    const caringTypeId = data.caringTypeId
      ? data.caringTypeId
      : oneCaring.caringTypeId;
    const nurseId = data.nurseId ? data.nurseId : oneCaring.nurseId;
    const patientId = data.patientId ? data.patientId : oneCaring.patientId;
    const time = data.time ? data.time : oneCaring.time;
    const description = data.description
      ? data.description
      : oneCaring.description;

    const newCaring = await CaringType.updateOne(
      { _id: caringId },
      { $set: { caringTypeId, description, nurseId, patientId, time } }
    );

    return newCaring;
  } catch (error) {
    console.error(error, "Error searching CupdateCaringType,,,");
    return false;
  }
};

module.exports = {
  getAllCarings,
  addNewCarings,
  getOneCaring,
  getCaringByNurseId,
  searchCaring,
  updateCaring,
};
