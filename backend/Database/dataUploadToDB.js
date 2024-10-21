const { category, items } = require("./");
const { categories } = require("./category");
const cloudinary = require('cloudinary').v2
// const Image = require("../images/fashion/1729057863544_fash.png")
const path = require('path');
// import Image from '../../frontend/src/assets/images/electronics/items/mobiles/-original-imah2nd53uhb7b6s.webp'

// TODO : Complete the image uploading and links updating in the DB
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
// cloudinary.config({ 
//   cloud_name: 'dsqym1wwy', 
//   api_key: '689688854567892', 
//   api_secret: 'C14bsiHox1heqPmwXlYpEC2WiPg' // Click 'View API Keys' above to copy your API secret
// });

// const images = [
//   {
//     folder : "Fashion",
//     img : [
//       "../images/fashion/1729057863544_fash.png",
//       "../images/fashion/items/men/-original-imah43ggq7whfk4k.webp",
//       "../images/fashion/items/men/3xl-pol-ochaco-wh-the-bear-house-original-imahyutaacmbqavv.webp",
//       "../images/fashion/items/men/5xl-c301-b-green-dennis-lingo-original-imah47hjt4rdqfx7.webp",
//       "../images/fashion/items/men/m-tbh-tally-bk-the-bear-house-original-imah5hhpmechtcha.webp",
//       "../images/fashion/items/men/s-os-100-vdorgnl-grn117-veirdo-original-imah4fy3zb5paeaj.webp",
//       "../images/fashion/items/men/s-tbh-primrose-pk-the-bear-house-original-imah5gb7gqd67ywe.webp",
//       "../images/fashion/items/men/s-tbh-uber-mr-the-bear-house-original-imafxxdh4mxubnrf.webp",
//       "../images/fashion/items/men/xxl-0123-shydch-31-02-the-indian-garage-co-original-imagz722g6n8kgpm.webp",
//       "../images/fashion/items/women/32-l-long-skirt-zwerlon-original-imah2sz3a69fqcmx.webp",
//       "../images/fashion/items/women/m-7186-sheetal-associates-original-imaguu9pbjgjfphc.webp",
//       "../images/fashion/items/women/m-7186-sheetal-associates-original-imaguu9pbjgjfphc.webp",
//       "../images/fashion/items/women/m-springs-329-ann-springs-original-imahf4jwwwhcajww.webp",
//       "../images/fashion/items/women/xl-grl-fs49-pink-drew-c1-leotude-original-imah5gbfxywaf57g.webp",
//       "../images/fashion/items/kids/-original-imah33d26wgxkgsp.webp",
//       "../images/fashion/items/kids/10-11-years-boy-fs-rn-kungfu-skin-doomee-original-imagyvyhhhdnhcmq.webp",
//       "../images/fashion/items/kids/11-12-years-hft-23h2w09-na-ics-hellcat-original-imagt67gshzrnca6.webp",
//       "../images/fashion/items/kids/13-14-years-hft-23hr5-bu-pe-be-sa-na-hellcat-original-imagn9y6h3ukcqdz.webp",
//       "../images/fashion/items/kids/15-16-years-hft-23hr2-ics-on-hellcat-original-imagn9uz7qhy3whz.webp",
//       "../images/fashion/items/kids/8-9-years-kids-hood-paris-grey-yy-clothing-original-imagp7t933cbqyah.webp",
//       "../images/fashion/items/kids/9-10-years-kian-kids-all-prnt-navy-caloya-original-imagqbucb6zurunj.webp"
//     ]
//   }
// ]

// let fashionImages = [];  
// (async function uploadImage(){
//   for(const img of images){
//     for (const j of img.img){
//       const imagePath = path.join(__dirname, j);
//       const resp = await cloudinary.uploader.upload(imagePath, {
//         folder : img.folder,
//         resource_type : "image",
//         allowed_formats : ["png", "webp"]
//       })
//       const url = resp.secure_url
//       fashionImages.push(url)
//     }
//   }
//   console.log(fashionImages)
// })()


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
