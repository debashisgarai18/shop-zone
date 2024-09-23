const { Router } = require("express");
const signupInputval = require("../middlewares/inputVal/singupInput");
const user = require("../Database");
const useRouter = Router();

useRouter.post("/signup", signupInputval, async (req, res) => {
  const { fname, lname, phno, uname, pwd } = req.body;

  // add to the database
  const response = await user.create({
    firstName: fname,
    lastName: lname,
    phoneNumber: phno,
    username: uname,
    password: pwd,
  });

  console.log(response)
});

useRouter.get("/", (req, res) => {
  res.status(404).json({
    message: "the server is responding",
  });
});

module.exports = useRouter;
