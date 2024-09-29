const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { admin, items } = require("../Database");
const signinInputVal = require("../middlewares/inputVal/admin/signinInput");
const signupInputval = require("../middlewares/inputVal/admin/signupInput");

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
adminRouter.post("/addItems", async (req, res) => {
  const op = await fetch("https://fakestoreapi.com/products");
  const data = await op.json();
  data.map((e) => {
    const res = items.create({
      id: e.id,
      title: e.title,
      price: e.price,
      description: e.description,
      category: e.category,
      image: e.image,
      rating: e.rating,
    });
  });
});

module.exports = adminRouter;
