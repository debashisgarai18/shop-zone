const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");

mongoose
  .connect(MONGO_URI, {
    authSource: "admin",
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
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
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
