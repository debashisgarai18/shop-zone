// this comprises of the routes which are independent of the auth logic
const { Router } = require("express");
const { category } = require("../Database");
const commonRouter = Router();
const { ObjectId } = require("mongodb");

// endpoint to get all the parentCategory names
commonRouter.get("/getCategories", async (req, res) => {
  try {
    const getCategory = await category.find({});
    let parentCategories = [];
    getCategory.map((e) => {
      parentCategories.push({
        cat: e.cat,
        expand: e.expand,
        sub: e.sub,
        drops: e.drops,
        logo: e.logo,
        bgColor: e.bgColor,
        hasProducts: e.hasProducts,
      });
    });
    return res.status(200).json({
      message: parentCategories,
    });
  } catch (err) {
    return res.status(411).json({
      message: `Bad Request, Error : ${err}`,
    });
  }
});

// endpoint to fetch the items given a catgegory
commonRouter.get("/getProducts/:category", async (req, res) => {
  const getCat = req.params.category;
  try {
    const cat = await category.findOne({
      cat: getCat,
    });
    if (!cat)
      return res.status(404).json({
        message: "No category found",
      });
    return res.status(200).json({
      message: cat,
    });
  } catch (err) {
    return res.status(403).json({
      message: `Some error occured : ${err}`,
    });
  }
});

// endpoint to get a specific item of given category and item ID
commonRouter.get("/getProductInfo/", async (req, res) => {
  const queryParams = req.query;
  const prodId = new ObjectId(queryParams.productId);
  try {
    const resp = await category.find({
      cat: queryParams.cat,
    });
    const matchedItem = resp[0].items.find((e) => e._id.equals(prodId));
    if (matchedItem) {
      return res.status(200).json({
        message: matchedItem,
      });
    } else {
      return res.status(404).json({
        message: "item not found",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: `Something went wrong!! : ${err}`,
    });
  }
});

// endpoint to render some random products from the DB of random category and name and put them as the featured products
commonRouter.get("/getRandomProducts", async (req, res) => {
  try {
    const resp = await category.find({});
    const allCategories = [];
    resp.map((e) => {
      if (
        e.cat != "Wellness" &&
        e.cat != "Beauty" &&
        e.cat != "Home" &&
        e.cat != "Shop"
      ) {
        allCategories.push(e.cat);
      }
    });

    const randomProductCount = 10;
    const randomProducts = [];
    for (let i = 1; i <= randomProductCount; ++i) {
      const getRandomCategory = Math.floor(
        Math.random() * (allCategories.length - 1 - 0) + 0
      );
      randomProducts.push(
        resp.find((e) => e.cat === allCategories[getRandomCategory]).items[
          Math.floor(
            Math.random() *
              (resp.find((e) => e.cat === allCategories[getRandomCategory])
                .items.length -
                1 -
                0) +
              0
          )
        ]
      );
    }

    return res.status(200).json({
      message: randomProducts,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error : ${err}`,
    });
  }
});

// endpoint to search and the filter items on the basis of rangeof values given + 
// also return the items whose name are given as search input values
commonRouter.get("/filterProduct", async (req, res) => {
  const cats = req.query.category;
  const minVal = req.query.minVal;
  const maxVal = req.query.maxVal;
  const searchValue = req.query.search;

  if (category && !searchValue) {
    try {
      const resp = await category.findOne({
        cat: cats,
      });
      const filteredProducts = resp.items.filter(
        (e) =>
          parseInt(e.disPrice.split(" ")[1]) >= parseInt(minVal) &&
          parseInt(e.disPrice.split(" ")[1]) <= parseInt(maxVal)
      );

      return res.status(200).json({
        message: filteredProducts,
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal Server Error : ${err}}`,
      });
    }
  } else {
    try {
      const getFilteredItem = await category.find({});
      const tempProducts = [];
      getFilteredItem
        .map((e) => e.items)
        .map((e) => {
          return e.map((ele) => {
            if (
              ele.name.includes(searchValue) ||
              ele.subCategory.includes(searchValue) ||
              ele.parentCategory.includes(searchValue)
            )
              tempProducts.push(ele);
          });
        });

      // checking that the filtered products lie in the value range
      const filteredProducts = tempProducts.filter(
        (e) =>
          parseInt(e.disPrice.split(" ")[1]) >= parseInt(minVal) &&
          parseInt(e.disPrice.split(" ")[1]) <= parseInt(maxVal)
      );

      return res.status(200).json({
        message: filteredProducts,
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal Server Error : ${err}}`,
      });
    }
  }
});

// todo : one endpoint to get related products --> given a category

module.exports = commonRouter;
