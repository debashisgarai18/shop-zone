const { category, items } = require("./") ;

async function addItemToCategory(itemData) {
    try {
      // Create a new item object
      const newItem = new items(itemData);

    //   Find the category by parentCategory and push the item to its items array
      const updatedCategory = await category.findOneAndUpdate(
        { cat: newItem.parentCategory }, // Match by cat field
        { $push: { items: newItem } },   // Push the item to the items array
        { new: true, upsert: true }      // Return the updated doc, create one if it doesn't exist
      );
        
      if (updatedCategory) {
        return updatedCategory.items[3];
      } else {
        throw new Error('Category not found');
      }
    } catch (err) {
      throw err;
    }
  }

  const exampleItem = {
    name: 'Sample Item',
    by: 'Brand c',
    orgPrice: '100',
    discPrice: '90',
    description: 'Sample description',
    parentCategory: 'Electronics',  // This should match with a category 'cat' value
    subCategory: 'Mobile Phones',
    image: 'image.jpg',
    star: 4,
  };

  addItemToCategory(exampleItem)
  .then(result => console.log('Item added successfully:', result))
  .catch(err => console.error('Error:', err));