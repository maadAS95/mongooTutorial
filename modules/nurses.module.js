const mongoose = require("mongoose");

const nursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  phone: {
    type: Number,
  },
  IsResigned: {
    type: Boolean,
  },
});
const Nurse = mongoose.model("nurse", nursesSchema);
module.exports = Nurse;
