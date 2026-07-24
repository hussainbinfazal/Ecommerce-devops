const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    category: { type: String, required: true },
    productImage: { type: String, required: true },
    images: [{ type: String }], // optional additional images
    countInStock: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
    tags: [{ type: String }], // e.g. ["summer", "men", "shoes"]
    isFeatured: { type: Boolean, default: false },
    discount: {
      type: Number, // discount in percentage (e.g. 15 means 15%)
      default: 0,
    },
    sku: { type: String }, // stock keeping unit
    colours: [{ type: String }],
    sizes: [{ type: String ,enum: ["S", "M", "L", "XL", "XXL","XXXL",'1','2','3','4','5','6','7','8','9','10','11','12'] }],
    material: { type: String },
    madeIn: { type: String },
    seller: { type: String},
    
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;