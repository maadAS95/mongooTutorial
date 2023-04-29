const Schema = mongoose.Schema;

const NursesSchema = new Schema({
  ID: { type: Number, required: true },
  Name: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  IsResigned: { type: Boolean, required: true },
});

const CaringTypeSchema = new Schema({
  ID: { type: Number, required: true },
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

const PatientSchema = new Schema({
  ID: { type: Number, required: true },
  Name: { type: String, required: true },
  RoomPhoto: { type: String, required: false },
  IsStopped: { type: Boolean, required: true },
});

const CaringSchema = new Schema({
  ID: { type: Number, required: true },
  Nurses_id: { type: Schema.Types.ObjectId, ref: "Nurses", required: true },
  CaringType_Id: {
    type: Schema.Types.ObjectId,
    ref: "CaringType",
    required: true,
  },
  Patient_Id: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  Time: { type: Date, required: true },
  Description: { type: String, required: true },
});
