const patientModule = require("../modules/patient.module.js");
var ObjectId = require("mongodb").ObjectId;
const getAllPatients = async () => {
  try {
    const patients = await patientModule.find({}, { __v: 0 }).sort({ _id: -1 });
    return patients;
  } catch (error) {
    console.error("Error getting patients");
    return [];
  }
};

const addNewPatient = async (data) => {
  const name = data.name ? data.name : "";
  const room = data.room ? data.room : "";
  const phone = data.phone ? Number(data.phone) : "";
  const isStopped = data.isStopped ? data.isStopped : "";
  const patient = new patientModule({
    name,
    room,
    phone,
    isStopped,
  });

  const result = await patient.save();
  return result;
};

const getOnePatient = async (id) => {
  try {
    const patient = await patientModule.findOne({ _id: id }, { __v: 0 });
    return patient;
  } catch (error) {
    console.error("Error getting one patient");
    return [];
  }
};

const removePatient = async (id) => {
  try {
    const removedPatient = await patientModule.deleteOne({ _id: id });
    return true;
  } catch (error) {
    console.error("Error removing patient", error);
    return false;
  }
};

const updatePatient = async (id, payload) => {
  try {
    const onePatient = await getOnePatient(id);
    if (!onePatient) return false;
    console.log(id);
    const name = payload.name ? payload.name : onePatient.name;
    const room = payload.room ? payload.room : onePatient.room;
    const phone = payload.phone ? payload.phone : onePatient.phone;
    const isStopped = payload.isStopped
      ? payload.isStopped
      : onePatient.isStopped;
    console.log({ name, room, phone, isStopped });
    const newPatient = await patientModule.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { room, phone, isStopped, name },
      }
    );
    return newPatient;
  } catch (error) {
    console.error("Error updatePatient", error);
    return false;
  }
};

const searchPatient = async (searchValue) => {
  try {
    const patients = await patientModule.find({
      $or: [
        { room: searchValue },
        { name: searchValue },
        { phone: searchValue },
      ],
    });
    return patients;
  } catch (error) {
    console.error(error, "Error searching,,,");
    return [];
  }
};

module.exports = {
  getAllPatients,
  addNewPatient,
  getOnePatient,
  removePatient,
  updatePatient,
  searchPatient,
};
