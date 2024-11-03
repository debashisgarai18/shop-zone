const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const signupInputval = require("../middlewares/inputVal/user/singupInput");
const signinInputVal = require("../middlewares/inputVal/user/signinInput");
const { user, items } = require("../Database");
const userAuth = require("../middlewares/authMiddleware/userAuth");
const { ZodFirstPartyTypeKind } = require("zod");

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
        const token = jwt.sign({ id: response._id }, JWT_SECRET);
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
      const token = jwt.sign({ id: userExists._id }, JWT_SECRET);
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

// endpoint to extarct the user deatils after authenticatiom
userRouter.get("/getUser", userAuth, async (req, res) => {
  const userId = req.userId;
  try {
    const userData = await user.findOne({
      _id: userId,
    });
    if (!userData)
      return res.status(404).json({
        message: "The requested user not found!!",
      });

    return res.status(200).json({
      message: userData,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Error : ${err}`,
    });
  }
});

// endpoint to add the items on the wishlist given the item details
userRouter.put("/updateWishlist/addItem", userAuth, async (req, res) => {
  const userId = req.userId;
  const payload = req.body;
  try {
    // find the user
    const getUser = await user.findOne({
      _id: userId,
    });

    // to check if the item exists in the wishlist
    // cannot use equals here as it is used for the obejct values only not for strings
    console.log(payload.category)
    const isItemPresent = getUser.wishlistItems.find(
      (e) => e.itemId === payload.itemId
    );
    if (!isItemPresent) getUser.wishlistItems.push(payload);

    // saving the updated changes in the DB
    await getUser.save();

    return res.status(200).json({
      message: {
        text : "Item added to wishlist!!",
        length : getUser.wishlistItems.length
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server error : ${err}`,
    });
  }
});

// endpoint to remove the item from the wishlist
userRouter.put(
  "/updateWishlist/removeItem/:itemId",
  userAuth,
  async (req, res) => {
    const userId = req.userId;
    try {
      const itemId = req.params.itemId;
      const getUser = await user.findOne({
        _id: userId,
      });

      // find the item in the wishlist
      const findItem = getUser.wishlistItems.find((e) => e.itemId === itemId);
      getUser.wishlistItems.splice(getUser.wishlistItems.indexOf(findItem), 1);

      await getUser.save();

      return res.status(200).json({
        message: {
          text : "The wishlist is updated successfully",
          length : getUser.wishlistItems.length
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal Server Error : ${err}`,
      });
    }
  }
);

// endpoint to view the wishlist of a user
userRouter.get("/showWishlist", userAuth, async (req, res) => {
  const userId = req.userId;
  try {
    const getUser = await user.findOne({
      _id: userId,
    });

    return res.status(200).json({
      wishlist: getUser.wishlistItems,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error : ${err}`,
    });
  }
});

// endpoint to add the items in the cart provided the payload
userRouter.put("/updateCart/addItem", userAuth, async (req, res) => {
  const payload = req.body;
  const userId = req.userId;
  try {
    const getUser = await user.findOne({
      _id: userId,
    });

    // check if the product is present in the cart or not
    const isProductPresent = getUser.cartItems.find(
      (e) => e.itemId === payload.itemId
    );
    if (isProductPresent) {
      isProductPresent.count += payload.count;
    } else {
      getUser.cartItems.push(payload);
    }

    await getUser.save();
    return res.status(200).json({
      message: {
        text : "Item Added Successfully",
        length : getUser.cartItems.length
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server error : ${err}`,
    });
  }
});

// endpoint to remove the item from the cart
userRouter.put("/updateCart/removeItem/:itemId", userAuth, async (req, res) => {
  const userId = req.userId;
  const itemId = req.params.itemId;
  try {
    const getUser = await user.findOne({
      _id: userId,
    });

    const findItem = getUser.cartItems.find((e) => e.itemId === itemId);
    getUser.cartItems.splice(getUser.cartItems.indexOf(findItem), 1);

    await getUser.save();

    return res.status(200).json({
      message: "The item is removed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error : ${err}`,
    });
  }
});

// endpoint to show all the items in the cart provided the userID
userRouter.get("/showCart", userAuth, async (req, res) => {
  const userId = req.userId;
  try {
    const getUser = await user.findOne({
      _id: userId,
    });

    return res.status(200).json({
      cart: getUser.cartItems,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error : ${err}`,
    });
  }
});

// endpoint to get the total price of the cart
// todo : this can be done in the client side as well
userRouter.get("/getTotalPrice", userAuth, async(req, res) => {
  const userId = req.userId;
  try{
    const getUser = await user.findOne({
      _id : userId
    })
    let totalCost = 0;
    getUser.cartItems.map((e) => {
      const price = e.count * parseInt(e.disPrice.split(" ")[1]);
      totalCost += price
    })

    return res.status(200).json({
      price : totalCost
    })
  }
  catch(err){
    return res.status(500).json({
      message : `Internal Server Error : ${err}`
    })
  }
})

// endpoint for, if the user is logged in and still trying to access the signin/signup endpoint
userRouter.get("/me", userAuth, (req, res) => {
  res.status(200).json({
    message: "Logged in",
  });
});

module.exports = userRouter;
