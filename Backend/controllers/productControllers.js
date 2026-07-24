const Product = require('../model/productModel');
const User = require('../model/userModel');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const createProduct = async (req, res) => {
  try {
    const productImages = req.files; // multer should give you either an array or an object of files
    const {
      name,
      description,
      price,
      brand,
      category,
      countInStock,
      tags,
      isFeatured,
      discount,
      sku,
      seller,
      colours,
      sizes,
      material,
      madeIn
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Name, description, price, and category are required.' });
    }

    // Check for existing product
    const productExists = await Product.findOne({ name, category, description, price });
    if (productExists) {
      return res.status(400).json({ message: 'Product already exists.' });
    }

    if (!productImages || productImages.length === 0) {
      return res.status(400).json({ message: 'At least one image is required.' });
    }

    // Assume the first image is the main productImage
    const productImage = productImages[0].filename;

    // Remaining images go to `images` field (skip first one)
    const additionalImages = productImages.slice(1).map(file => file.filename);

    // Handle comma-separated tags (if passed as a string)
    const parsedTags = typeof tags === 'string'
      ? tags.split(',').map(tag => tag.trim())
      : Array.isArray(tags)
        ? tags
        : [];

    const newProduct = new Product({
      name,
      description,
      price,
      brand,
      category,
      countInStock: countInStock || 0,
      tags: parsedTags,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      discount: discount || 0,
      sku,
      productImage,
      images: additionalImages,
      seller: seller,
      colours: colours,
      sizes: sizes,
      material: material,
      madeIn: madeIn
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedFiles = req.files;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      price,
      category,
      description,
      countInStock,
      tags,
      brand,
      sku,
      discount,
      isFeatured,
      removedImages,
      removeMainImage,
      seller,
      colours,
      sizes,
      material,
      madeIn
    } = req.body;

    console.log("This is the request body:", req.body);
    let removed = [];
    if (removedImages) {
      try {
        removed = JSON.parse(removedImages);
      } catch (err) {
      }

      existingProduct.images = existingProduct.images.filter(
        (img) => !removed.includes(img)
      );

      removed.forEach((filename) => {
        const filePath = path.join(
          __dirname,
          "../uploads/productImages",
          filename
        );
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Failed to delete ${filename}:`, err);
          });
        }
      });
    }


    let newMainImage = existingProduct.productImage;
    if (removeMainImage === "true" && existingProduct.productImage) {
      const mainImagePath = path.join(
        __dirname,
        "../uploads/productImages",
        existingProduct.productImage
      );
      if (fs.existsSync(mainImagePath)) {
        fs.unlink(mainImagePath, (err) => {
          if (err) console.error("Failed to delete main image:", err);
        });
      }
      newMainImage = ""; // or null if you prefer
    }


    let newGalleryImages = existingProduct.images;

    if (updatedFiles && updatedFiles.length > 0) {
      // If main image already exists (and wasn't marked for removal), remove it only if a new one is uploaded
      if (existingProduct.productImage && !removeMainImage && updatedFiles[0]) {
        const oldMainImagePath = path.join(
          __dirname,
          "../uploads/productImages",
          existingProduct.productImage
        );
        if (fs.existsSync(oldMainImagePath)) {
          fs.unlink(oldMainImagePath, (err) => {
            if (err) console.error("Failed to delete old main image:", err);
          });
        }
      }

      // First image is main
      newMainImage = updatedFiles[0].filename;

      // The rest go into the gallery
      const uploadedGallery = updatedFiles.slice(1).map((file) => file.filename);
      newGalleryImages = [...newGalleryImages, ...uploadedGallery];
    }

    // 🔥 4. Update product fields
    existingProduct.name = name || existingProduct.name;
    existingProduct.price = price || existingProduct.price;
    existingProduct.category = category || existingProduct.category;
    existingProduct.description = description || existingProduct.description;
    existingProduct.countInStock =
      countInStock !== undefined ? countInStock : existingProduct.countInStock;
    existingProduct.brand = brand || existingProduct.brand;
    existingProduct.sku = sku || existingProduct.sku;
    existingProduct.discount =
      discount !== undefined ? discount : existingProduct.discount;
    existingProduct.isFeatured =
      isFeatured !== undefined ? isFeatured : existingProduct.isFeatured;
    existingProduct.seller = seller || existingProduct.seller;
    existingProduct.colours = colours || existingProduct.colours;
    existingProduct.sizes = sizes || existingProduct.sizes;
    existingProduct.material = material || existingProduct.material;
    existingProduct.madeIn = madeIn || existingProduct.madeIn;

    // 🔥 Tags conversion
    if (tags) {
      existingProduct.tags =
        typeof tags === "string"
          ? tags.split(",").map((tag) => tag.trim())
          : Array.isArray(tags)
            ? tags
            : [];
    }
    if (colours) {
      existingProduct.colours =
        typeof colours === "string"
          ? colours.split(",").map((colour) => colour.toLowerCase().trim())
          : Array.isArray(colours)
            ? colours
            : [];
    }
    if (sizes) {
      existingProduct.sizes =
        typeof sizes === "string"
          ? sizes.split(",").map((size) => size.trim())
          : Array.isArray(sizes)
            ? sizes
            : [];
    }

    // 🔥 Final image assignments
    existingProduct.productImage = newMainImage;
    existingProduct.images = newGalleryImages;

    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category', 'name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to generate fake product data for testing //
const generateFakeProduct = () => {
  const categories = ["Men", "Women", "Kids", "Electronics", "Home"];
  const brands = ["Nike", "Adidas", "Samsung", "Sony", "Apple"];
  const tagsPool = ["summer", "new", "sale", "popular", "exclusive"];

  const randomTags = faker.helpers.arrayElements(
    tagsPool,
    faker.number.int({ min: 1, max: 3 })
  );

  return {
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price: parseFloat(faker.commerce.price({ min: 20, max: 500 })),
    brand: faker.helpers.arrayElement(brands),
    category: faker.helpers.arrayElement(categories),
    productImage: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    images: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
      faker.image.urlPicsumPhotos({ width: 300, height: 300 })
    ),
    countInStock: faker.number.int({ min: 0, max: 100 }),
    numReviews: faker.number.int({ min: 0, max: 100 }),
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    tags: randomTags,
    isFeatured: faker.datatype.boolean(),
    discount: faker.number.int({ min: 0, max: 50 }),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    reviews: [],
    seller: faker.company.name(),
    colours: faker.helpers.arrayElement(["Red", "Blue", "Green", "Yellow", "Black", "White"]),
    sizes: faker.helpers.arrayElement(["S", "M", "L", "XL", "XXL"]),
    material: faker.helpers.arrayElement(["Cotton", "Leather", "Polyester", "Silk", "Wool"]),
    madeIn: faker.location.country(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
};

// Controller function to seed N fake products
const seedFakeProducts = async (req, res) => {
  const count = parseInt(req.query.count) || 10;

  try {
    const fakeProducts = Array.from({ length: count }, generateFakeProduct);
    const inserted = await Product.insertMany(fakeProducts);

    res.status(201).json({
      message: `${inserted.length} fake products created successfully`,
      products: inserted,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create fake products" });
  }
};

const likeProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const allLikedProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('likedProducts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.likedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getProducts, getProductById, deleteProduct, updateProduct, createProduct, seedFakeProducts, allLikedProducts, likeProducts };