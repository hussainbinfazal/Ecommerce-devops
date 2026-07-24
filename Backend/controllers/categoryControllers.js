const Category = require("../model/categoryModel.js");
const Product = require("../model/productModel.js");
// @desc    Get all categories
const getAllCategories = async (req, res) => {
    try {
        const allProducts = await Product.find();

        const categoryMap = new Map();

        allProducts.forEach((product) => {
            const categoryName = product.category;
            const subcategoryName = product.brand;
            const optionName = product.material;
            const suboptions = product.colours || [];

            // Create category if not exists
            if (!categoryMap.has(categoryName)) {
                categoryMap.set(categoryName, {
                    name: categoryName,
                    subcategories: [],
                });
            }

            const category = categoryMap.get(categoryName);

            // Find or create subcategory
            let subcategory = category.subcategories.find(
                (s) => s.name === subcategoryName
            );
            if (!subcategory) {
                subcategory = {
                    name: subcategoryName,
                    options: [],
                };
                category.subcategories.push(subcategory);
            }

            // Find or create option
            let option = subcategory.options.find((o) => o.name === optionName);
            if (!option) {
                option = {
                    name: optionName,
                    suboptions: [],
                };
                subcategory.options.push(option);
            }

            // Add unique suboptions (colours)
            suboptions.forEach((subopt) => {
                if (!option.suboptions.find((so) => so.name === subopt)) {
                    option.suboptions.push({ name: subopt });
                }
            });
        });

        
        const categories = Array.from(categoryMap.values());

       
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create new category
const createCategory = async (req, res) => {
    try {
        const { name, image, subcategories, suboptions } = req.body;
        const newCategory = new Category({ name, image, subcategories, });
        const saved = await newCategory.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update category
const updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated) return res.status(404).json({ message: "Category not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete category
const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };