const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
  },
  userEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("user", usersSchema);
