const mongoose = require("mongoose");

const caringTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CaringType = mongoose.model("caringType", caringTypesSchema);
module.exports = CaringType;
