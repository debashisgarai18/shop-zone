const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");

mongoose.connect(MONGO_URI);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
