// POST /wishlist/merge

const Wishlist = require('../model/wishlistModel');
const User = require('../model/userModel');
const Product = require('../model/productModel');
const mongoose = require('mongoose');

const mergeGuestLikes = async (req, res) => {
  try {
    const { guestLikes } = req.body;
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    const guestProductIds = guestLikes.map(p => p.product?._id.toString());
    const existingProductIds = wishlist.items.map(item => item.product?._id.toString());
    
   
    const uniqueNewProductIds = guestProductIds.filter(id => !existingProductIds.includes(id));

    uniqueNewProductIds.forEach(productId => {
      wishlist.items.push({ product: productId });
    });
    await wishlist.save();

    const populated = await Wishlist.findById(wishlist._id).populate('items.product');
    res.status(200).json(populated.items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to merge guest likes' });
  }
};

const fetchWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product');
    res.status(200).json(wishlist?.items || []);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // Create new wishlist
      wishlist = new Wishlist({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      // Check if product already exists in wishlist
      const alreadyInWishlist = wishlist.items.some(item =>
        item.product.equals(productId)
      );

      if (alreadyInWishlist) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      // Add product to items array
      wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product to wishlist' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Filter out the product
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove product from wishlist' });
  }
};


module.exports = {
  mergeGuestLikes,
  fetchWishlist,
  addToWishlist,
  removeFromWishlist
};