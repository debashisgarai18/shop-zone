const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");
const { boolean, string } = require("zod");

mongoose.connect(MONGO_URI);

// schema for the items to be added
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  by: {
    type: String,
    required: true,
  },
  orgPrice: {
    type: String,
    required: true,
  },
  disPrice: {
    type: String,
    required: true,
  },
  description: String,
  parentCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  img: String,
  star: Number,
  availableCount: Number,
});

// categories Schema to hold the items for each category
const categoriesSchema = new mongoose.Schema({
  cat: {
    type: String,
    required: true,
    unique: true,
  },
  expand: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasProducts: {
    type: Boolean,
    required: true,
    default: false,
  },
  // TODO : This needs to be updated with a default value -> and is to be taken from item's subcategory
  sub: [String],
  logo: String,
  bgColor: String,
  // This needs to be taken from the item schema
  items: [itemsSchema],
  // this is exclusively for shop
  drops: [],
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

// schema for the items in the cart and its count
const cartItemSchema = new mongoose.Schema({
  category : {
    type : String,
    required : true
  },
  itemId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  disPrice: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

// this is the scehma for the items in the wishlist
const wishlistItemSchema = new mongoose.Schema({
  category : {
    type : String,
    required : true
  },
  itemId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  disPrice: {
    type: String,
    required: true,
  },
});

// schema for the user data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  cartItems: [cartItemSchema],
  wishlistItems: [wishlistItemSchema],
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const items = mongoose.model("Items", itemsSchema);
const category = mongoose.model("Category", categoriesSchema);
const user = mongoose.model("User", userSchema);
const admin = mongoose.model("Admin", adminSchema);

module.exports = { user, items, admin, category };
