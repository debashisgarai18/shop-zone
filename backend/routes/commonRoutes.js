// this comprises of the routes which are independent of the auth logic
const { Router } = require("express");
const { category } = require("../Database");
const commonRouter = Router();

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

module.exports = commonRouter;
