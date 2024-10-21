const { category, items } = require("./");
const { categories } = require("./category");
const cloudinary = require('cloudinary').v2
// const Image = require("../images/fashion/1729057863544_fash.png")
const path = require('path');
// import Image from '../../frontend/src/assets/images/electronics/items/mobiles/-original-imah2nd53uhb7b6s.webp'

// this function is to populate the categories
// (async function () {
//   categories.map(async (e) => {
//     try {
//       const newCategory = new category(e);
//       const updatedCategory = await category.create(newCategory);

//       if (updatedCategory) return "Categories Updated";
//       else throw new error("some issue");
//     } catch (err) {
//       console.log("some error", err);
//     }
//   });
// })();

// upload the image to cloudinary
cloudinary.config({ 
  cloud_name: 'dsqym1wwy', 
  api_key: '689688854567892', 
  api_secret: 'C14bsiHox1heqPmwXlYpEC2WiPg' // Click 'View API Keys' above to copy your API secret
});

(async function uploadImage(){

  const imagePath = path.join(__dirname, '../images/fashion/items/kids/-original-imah33d26wgxkgsp.webp');
  cloudinary.uploader.upload(imagePath, {
    resource_type : "image",
    allowed_formats : ["png", "webp"]
  }).then(res => console.log(res)).catch(err => console.log(err));
})()

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
