const caringModule = require("../modules/caring.module");

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

module.exports = {
  getAllCarings,
  addNewCarings,
  getOneCaring,
  getCaringByNurseId,
};
