const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { admin } = require("../Database");
const signinInputVal = require("../middlewares/inputVal/admin/signinInput");
const signupInputval = require("../middlewares/inputVal/admin/signupInput");

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

module.exports = adminRouter;
