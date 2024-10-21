// this comprises of the routes which are independent of the auth logic
const {Router} = require("express");
const { category } = require("../Database");
const commonRouter = Router()

// endpoint to get all the parentCategory names 
commonRouter.get("/getCategories", async (req, res) => {
    try{
        const getCategory = await category.find({})
        let parentCategories = []; 
        getCategory.map((e) => {
            parentCategories.push({
                cat : e.cat,
                expand : e.expand,
                sub : e.sub,
                drops : e.drops,
                logo: e.logo,
                bgColor : e.bgColor
            })
        });
        return res.status(200).json({
            message : parentCategories
        })
    }catch(err){
        return res.status(411).json({
            message : `Bad Request, Error : ${err}`
        })
    }
})

module.exports = commonRouter 