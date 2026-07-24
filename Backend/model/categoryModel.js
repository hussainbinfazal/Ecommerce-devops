const mongoose = require("mongoose");   

const subOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Material
  suboptions: [subOptionSchema], // Colors
});

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Brand
  options: [optionSchema],
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. Women's Fashion
  image: { type: String }, // Optional image URL
  subcategories: [{subcategorySchema}],
}, {
  timestamps: true,
});

const Category = mongoose.model("Category", categorySchema);