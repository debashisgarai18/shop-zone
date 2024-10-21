const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");
const { boolean } = require("zod");

mongoose.connect(MONGO_URI);

// schema for the items to be added
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  by : {
    type : String,
    required : true
  },
  orgPrice: {
    type : String,
    required : true
  },
  disPrice : {
    type : String,
    required : true
  },
  description: String,
  parentCategory: {
    type : String,
    required : true
  },
  subCategory : {
    type : String,
    required : true
  },
  img: String,
  star: Number,
  availableCount : Number 
});

// categories Schema to hold the items for each category
const categoriesSchema = new mongoose.Schema({
  cat : {
    type : String,
    required : true,
    unique : true 
  },
  expand : {
    type : Boolean,
    required : true,
    default : false
  },
  hasProducts : {
    type: Boolean,
    required : true,
    default : false
  },
  // TODO : This needs to be updated with a default value -> and is to be taken from item's subcategory
  sub : [String],
  logo : String,
  bgColor : String,
  // This needs to be taken from the item schema
  items : [itemsSchema],
  // this is exclusively for shop
  drops : []
})

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
const userItemsSchema = new mongoose.Schema({
  itemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
  },
  count: {
    type: Number,
    default: 1,
  }
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
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  items: [userItemsSchema],
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const items = mongoose.model("Items", itemsSchema);
const category = mongoose.model("Category", categoriesSchema)
const user = mongoose.model("User", userSchema);
const admin = mongoose.model("Admin", adminSchema);

module.exports = { user, items, admin, category };
