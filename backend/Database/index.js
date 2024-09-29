const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");
const { boolean } = require("zod");

mongoose.connect(MONGO_URI);

// schema for the items to be added
const itemsSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: Object,
});

// schema for the admin database
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});


// schema for the user data
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
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const items = mongoose.model("Items", itemsSchema);
const user = mongoose.model("User", userSchema);
const admin = mongoose.model("Admin", adminSchema);

module.exports = { user, items, admin };
