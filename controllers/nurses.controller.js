const { $where } = require("../modules/caring.module");
const nursesModule = require("../modules/nurses.module");

const getAllNurses = async () => {
  try {
    const nurses = await nursesModule.find({}, { __v: 0 });

    return nurses;
  } catch (error) {
    console.error(error, "Error in getting all nurses");
    return {
      success: false,
      message: "error getting nurses",
      result: [],
    };
  }
};

const addNewNurse = async (params) => {
  try {
    const { name, gender, phone, IsResigned } = params;

    const nurse = new nursesModule({
      name,
      gender,
      phone,
      IsResigned,
    });

    const result = await nurse.save();

    return result;
  } catch (error) {
    console.error(error, "Error in getting all nurses");
    return false;
  }
};

const getOneNurse = async (id) => {
  try {
    const nurse = await nursesModule.findById({ _id: id }, { __v: 0 });
    return nurse;
  } catch (error) {
    console.error(error, "Error in getting one nurse");
    return {
      success: false,
      message: "error getting Nurse",
      result: [],
    };
  }
};

const removeOneNurse = async (id) => {
  try {
    const nurse = await nursesModule.deleteOne({ _id: id });
    return nurse;
  } catch (error) {
    console.error(error, "Error in remove one nurse");
    return {
      success: false,
      message: "error remove a nurse",
    };
  }
};

const searchNurses = async (searchValue) => {
  try {
    const nurses = await nursesModule.find({
      $or: [
        { name: searchValue },
        { gender: searchValue },
        { phone: searchValue },
      ],
    });
    return nurses;
  } catch (error) {
    return [];
  }
};

const updateNurse = async (id, payload) => {
  try {
    const oneNurse = await getOneNurse(id);
    if (!oneNurse) return false;

    const name = payload.name ? payload.name : oneNurse.name;
    const gender = payload.gender ? payload.gender : oneNurse.gender;
    const phone = payload.phone ? payload.phone : oneNurse.phone;
    const IsResigned = payload.IsResigned
      ? payload.IsResigned
      : oneNurse.IsResigned;
    console.log({ name, gender, phone, IsResigned });
    const newNurse = await nursesModule.updateOne(
      { _id: id },
      {
        $set: { gender, phone, IsResigned, name },
      }
    );
    return newNurse;
  } catch (error) {
    console.error("Error updateNurse", error);
    return false;
  }
};

module.exports = {
  getAllNurses,
  addNewNurse,
  getOneNurse,
  removeOneNurse,
  searchNurses,
  updateNurse,
};
