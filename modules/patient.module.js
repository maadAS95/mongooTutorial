const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  isStopped: {
    type: Boolean,
    required: true,
  },
});

const Patient = mongoose.model("patient", patientSchema);
module.exports = Patient;
