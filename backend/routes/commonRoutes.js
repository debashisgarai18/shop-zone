// this comprises of the routes which are independent of the auth logic
const { Router } = require("express");
const { category } = require("../Database");
const commonRouter = Router();
const {ObjectId} = require("mongodb")

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
        hasProducts : e.hasProducts
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
  const prodId = new ObjectId(queryParams.productId)
  try{
    const resp = await category.find({
      cat : queryParams.cat
    })
    const matchedItem = resp[0].items.find((e) => e._id.equals(prodId))
    if(matchedItem) {
      return res.status(200).json({
        message : matchedItem
      })
    }
    else{
      return res.status(404).json({
        message : "item not found"
      })
    }
  }
  catch(err){
    return res.status(400).json({
      message : `Something went wrong!! : ${err}`
    })
  }
})

// todo : endpont to render some random products from the DB of random category and name and put them as the featured products
// todo : one endpoint to get related products --> given a category
// todo : the search and the filter endpoints -> for the landing page
// todo : endpoint need to filter out the products on the specifc range provided of the specific category 

module.exports = commonRouter;
