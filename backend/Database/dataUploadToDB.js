const { category, items } = require("./");
const { categories } = require("./category");

// this function is to populate the categories
(async function () {
  categories.map(async (e) => {
    try {
      const newCategory = new category(e);
      const updatedCategory = await category.create(newCategory);

      if (updatedCategory) return "Categories Updated";
      else throw new error("some issue");
    } catch (err) {
      console.log("some error", err);
    }
  });
})();

// (async function addItemToCategory(itemData) {
//     itemData.map((e)=> {
//         if(e.items?.length >= 1){
//            e.items?.map(async (elem) => {
//             try{
//             //  const newItem = new items(elem);
//             //     await items.create(newItem);
//                 const updateSubCategory = await category.findOne({
//                     cat : elem.parentCategory
//                 })
//                 // console.log(updateSubCategory.cat, elem.subCategory)
//                 // console.log(updateSubCategory.sub.includes(elem.subCategory))
//                 if(!updateSubCategory.sub.includes(elem.subCategory)){
//                     console.log(updateSubCategory.sub.length)
//                     updateSubCategory.sub.push(elem.subCategory)
//                     await updateSubCategory.save();
//                 }
//             }
//             catch(err){
//                 return `Some error occured : ${err}`
//             }
//            })
//         }
//     })
// })(categories)
