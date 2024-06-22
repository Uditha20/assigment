import mongoose from "mongoose";

const products = new mongoose.Schema({
  productName: {
    type: String,
    
  },
  price: {
    type: Number,
  
  },
  item_count: {
    type: Number,
   
  },
  description: {
    type: String,
    
  },

  color: {
    type: String,
  },
  size: {
    type: String,
    default: "normal"
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  categoryName: {
    type: String,
    default: "ware",
  },
 
  mainImage: {
    type: String, // URL or path to the main image
  },
  additionalImages: [{
    type: String, // Array of URLs or paths to additional images
  }],

  //  need to add the image field
});

const Product = mongoose.model("product", products);
export default Product;
