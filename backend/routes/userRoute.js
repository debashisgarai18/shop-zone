const { Router } = require("express");
const signupInputval = require("../middlewares/inputVal/singupInput");
const user = require("../Database");
const useRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const signinInputVal = require("../middlewares/inputVal/signinInput");

useRouter.post("/signup", signupInputval, async (req, res) => {
  const { fname, lname, phno, uname, pwd } = req.body;

  // check whether the user exists or not
  const check = await user.findOne({
    username: uname,
  });

  if (check) {
    res.status(200).json({
      message: "This username already exits!!",
    });
    return;
  } else {
    // hashing the password to save to DB
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // add to the database
    const response = await user.create({
      username: uname,
      firstName: fname,
      lastName: lname,
      phoneNumber: phno,
      password: hashedPwd,
    });

    if (response) {
      const token = jwt.sign({ id: response._id }, JWT_SECRET, {
        expiresIn: "12h",
      });
      res.status(200).json({
        token: token,
      });
    }
  }
});

useRouter.post("/signin", signinInputVal, async (req, res) => {
  const { uname, pwd } = req.body;

  // find the user
  const userExists = await user.findOne({
    username: uname,
  });

  if (userExists) {
    const mainPwd = await bcrypt.compare(pwd, userExists.password);
    if (mainPwd) {
      const token = jwt.sign({ id: userExists }, JWT_SECRET, {
        expiresIn: "12h",
      });
      res.status(200).json({
        token: token,
      });
    } else {
      res.status(404).json({
        message: "The enterred password is incorrect! Check and continue!!",
      });
      return;
    }
  } else {
    res.status(404).json({
      message: "The user doesnot exists!! Kindly re-check the entries",
    });
    return;
  }
});

module.exports = useRouter;
