const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const signupInputval = require("../middlewares/inputVal/user/singupInput");
const signinInputVal = require("../middlewares/inputVal/user/signinInput");
const { user, items} = require("../Database");
const userAuth = require("../middlewares/authMiddleware/userAuth");

// the me endpoint
// to check when the user is logged in, if they go to signin/signup page, it should redirect to the current page
// else if they are not logged in they shouldn't be able to go to any of the pages in Ui except the signin and signup
userRouter.get("/me", userAuth, (req, res) => {
  if (req.userId)
    return res.status(200).json({
      message: "User found",
    });
});

userRouter.post("/signup", signupInputval, async (req, res) => {
  const { fname, phno, uname, pwd } = req.body;

  try {
    // check whether the user exists or not
    const check = await user.findOne({
      username: uname,
    });

    if (check) {
      res.status(200).json({
        message: "This user already exits!!",
      });
      return;
    } else {
      // hashing the password to save to DB
      const hashedPwd = await bcrypt.hash(pwd, 10);
      // add to the database
      const response = await user.create({
        username: uname,
        fullName: fname,
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
  } catch (err) {
    return res.status(404).json({
      message: `Some error occured :${err}`,
    });
  }
});

userRouter.post("/signin", signinInputVal, async (req, res) => {
  const { uname, pwd } = req.body;

  // find the user
  const userExists = await user.findOne({
    username: uname,
  });

  if (userExists) {
    const mainPwd = await bcrypt.compare(pwd, userExists.password);
    if (mainPwd) {
      const token = jwt.sign({ id: userExists._id }, JWT_SECRET, {
        expiresIn: "12h",
      });
      res.status(200).json({
        token: token,
      });
    } else {
      res.status(404).json({
        message: "Incorrect Password for User!! Check and retry",
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

// this is the endpoint to get all the items
// TODO : Remove this
// userRouter.get("/allItems", async (req, res) => {
//   const response = await items.find({});
//   if (response) {
//     res.status(200).json(
//       response.map((e) => {
//         return {
//           id: e.id,
//           title: e.title,
//           price: e.price,
//           desc: e.description,
//           category: e.category,
//           image: e.image,
//           rating: e.rating,
//         };
//       })
//     );
//   } else {
//     res.status(404).json({
//       message: "There is some issue in getting the Items!!",
//     });
//   }
// });

// endpoint to extarct the user deatils after authenticatiom
userRouter.get("/getUser", userAuth, async(req, res) => {
  const userId = req.userId;
  try{
      const userData = await user.findOne({
        _id : userId
      });
      if(!userData) return res.status(404).json({
        message : "The requested user not found!!"
      })

      return res.status(200).json({
        message : userData
      })
  }
  catch(err){
    return res.status(404).json({
      message : `Error : ${err}`
    })
  }
})

// endpoint to extract all the categories
userRouter.get("/categories", async (req, res) => {
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
userRouter.get("/getItems/:category", async (req, res) => {
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
userRouter.get("/itemDetails/:itemId", async (req, res) => {
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

// endpoint to add the item in the cart -> if saeme item added then increase the count
userRouter.put("/addToCart/addItem/:itemId", userAuth, async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const updateUser = await user.findById(req.userId);
    if (!updateUser) {
      res.status(404).json({
        message: "The user doesnot exists!!",
      });
      return;
    }

    // logic to check whether the item exists or not, if so then increase the count
    const ifItemExists = updateUser.items.find((e) => e.itemID.equals(itemId));
    if (ifItemExists) {
      ifItemExists.count += 1;
    } else {
      updateUser.items.push({ itemID: itemId, count: 1 });
    }

    await updateUser.save();
    res.status(200).json({
      message: `Your cart is updated with the itemId : ${itemId}`,
    });
  } catch (err) {
    res.status(404).message({
      message: `The error is : ${err}`,
    });
  }
});

// endpoint to add the item in the cart -> if saeme item added then increase the count
userRouter.put("/addToCart/removeItem/:itemId", userAuth, async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const updateUser = await user.findById(req.userId);
    if (!updateUser) {
      res.status(404).json({
        message: "The user doesnot exists!!",
      });
      return;
    }

    // logic to check whether the item exists or not, if so then increase the count
    const ifItemExists = updateUser.items.find((e) => e.itemID.equals(itemId));
    if (ifItemExists && ifItemExists.count > 1) {
      ifItemExists.count -= 1;
    } else if (ifItemExists && ifItemExists.count <= 1) {
      // if the count <= 0 then just trim down the element from the array
      updateUser.items.splice(updateUser.items.indexOf(ifItemExists), 1);
    } else {
      res.status(404).json({
        message: "The item is not found in the cart!!",
      });
    }

    await updateUser.save();
    res.status(200).json({
      message: `Your cart is updated with the itemId : ${itemId}`,
    });
  } catch (err) {
    res.status(404).json({
      message: `The error is : ${err}`,
    });
    return;
  }
});

// endpoint to calculate the total price of the cart for the specific user
userRouter.get("/paymentPage", userAuth, async (req, res) => {
  try {
    const userRef = await user.findById(req.userId);

    if (!userRef) {
      res.status(404).json({
        message: "The user does not exists!!",
      });
    }

    // to calculate the price at the payments page
    const userItems = userRef.items;
    let totalPrice = 0;
    for (const e of userItems) {
      const item = await items.findById(e.itemID);
      totalPrice += item.price * e.count;
    }

    res.status(200).json({
      totalPrice: totalPrice,
    });
  } catch (err) {
    res.status(404).json({
      message: `Some error occured : ${err}`,
    });
  }
});

// endpoint for, if the user is logged in and still trying to access the signin/signup endpoint
userRouter.get("/me", userAuth, (req, res) => {
  res.status(200).json({
    message: "Logged in",
  });
});

module.exports = userRouter;
