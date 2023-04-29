const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaringSchema = new Schema({
  nurseId: { type: Schema.Types.ObjectId, ref: "nurse", required: true },
  caringTypeId: {
    type: Schema.Types.ObjectId,
    ref: "caringType",
    required: true,
  },
  patientId: { type: Schema.Types.ObjectId, ref: "patient", required: true },
  time: { type: Date, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("caring", CaringSchema);
