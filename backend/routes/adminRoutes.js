const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { admin, items } = require("../Database");
const signinInputVal = require("../middlewares/inputVal/admin/signinInput");
const signupInputval = require("../middlewares/inputVal/admin/signupInput");
const adminAuth = require("../middlewares/authMiddleware/adminAuth");

// endpoint for admin signup
adminRouter.post("/signup", signupInputval, async (req, res) => {
  const { uname, pwd } = req.body;
  const exists = await admin.findOne({
    username: uname,
  });
  if (exists) {
    res.status(404).json({
      message: "This admin already exists!!",
    });
    return;
  } else {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const response = await admin.create({
      username: uname,
      password: hashedPwd,
      isAdmin: true,
    });
    const token = jwt.sign({ id: response._id }, JWT_SECRET, {
      expiresIn: "12h",
    });
    res.status(200).json({
      isAdmin: response.isAdmin,
      token: token,
    });
  }
});

// endpoint for admin signin
adminRouter.post("/signin", signinInputVal, async (req, res) => {
  const { uname, pwd } = req.body;
  const findAdmin = await admin.findOne({
    username: uname,
  });
  if (!findAdmin) {
    res.status(404).json({
      message: "The Admin doesnot exists!! Kindly re-check the entries",
    });
    return;
  } else {
    const pwdCheck = await bcrypt.compare(pwd, findAdmin.password);
    if (!pwdCheck) {
      res.status(404).json({
        message: "Incorrect Password for Admin!! Check and retry",
      });
    } else {
      const token = jwt.sign({ id: findAdmin._id }, JWT_SECRET, {
        expiresIn: "12h",
      });
      res.status(200).json({
        isAdmin: findAdmin.isAdmin,
        token: token,
      });
    }
  }
});

// this is endpoint is to add the fetched data to the items DB
// TODO : DO this later -> add the fields where the admin can add new items and then we can psuh them onto the items DB
adminRouter.post("/addItems", adminAuth, async (req, res) => {
  // const op = await fetch("https://fakestoreapi.com/products");
  // const data = await op.json();
  // data.map((e) => {
  //   const res = items.create({
  //     id: e.id,
  //     title: e.title,
  //     price: e.price,
  //     description: e.description,
  //     category: e.category,
  //     image: e.image,
  //     rating: e.rating,
  //   });
  // });
});

// this is the endpoint to get all the items
adminRouter.get("/allItems", async (req, res) => {
  const response = await items.find({});
  if (response) {
    res.status(200).json(
      response.map((e) => {
        return {
          id: e.id,
          title: e.title,
          price: e.price,
          desc: e.description,
          category: e.category,
          image: e.image,
          rating: e.rating,
        };
      })
    );
  } else {
    res.status(404).json({
      message: "There is some issue in getting the Items!!",
    });
  }
});

// endpoint to extract all the categories
adminRouter.get("/categories", async (req, res) => {
  try {
    const response = await items.find({});
    const categories = [];
    for (const e of response) {
      if (categories.includes(e.category)) continue;
      else {
        categories.push(e.category);
      }
    }
    res.status(200).json({
      allCategories: categories,
    });
  } catch (err) {
    res.status(404).json({
      message: `Some error occured : ${err}`,
    });
    return;
  }
});

// endpoint to show the items based on the category
adminRouter.get("/getItems/:category", async (req, res) => {
  const cgory = req.params.category;
  try {
    const response = await items.find({});
    const categorizedItems = response.filter((e) => e.category === cgory);
    res.status(200).json({
      categorizedItems: categorizedItems,
    });
  } catch (err) {
    res.status(404).json({
      message: `Some error occured : ${err}`,
    });
    return;
  }
});

// endpoint to show the item detail when clicked on a specific Item
adminRouter.get("/itemDetails/:itemId", async (req, res) => {
  const id = req.params.itemId;
  try {
    const itemById = await items.findById(id);
    if (itemById) {
      res.status(200).json({
        item: itemById,
      });
    } else {
      res.status(404).json({
        message: `The item ${id} is not found`,
      });
      return;
    }
  } catch (err) {
    res.status(404).json({
      message: `Some error occured : ${err}`,
    });
    return;
  }
});

// endpoint for, if the user is logged in and still trying to access the signin/signup endpoint
adminRouter.get("/me", adminAuth, (req, res) => {
  res.status(200).json({
    message : "Logged in"
  })
})

module.exports = adminRouter;
