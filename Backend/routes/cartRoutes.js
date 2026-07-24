const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/isAuthenticated');
const {
    addToCart,
    getCartItems,
    applyCouponToCart,
    removeFromCart,
    clearCart,
    updateProductQuantity,
    mergeGuestCart,
    createFakeCart,
 } = require('../controllers/cartController');
router.post('/add', protect, addToCart);
router.get('/get', protect, getCartItems);
router.delete('/remove/:productId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);
router.put('/update/:productId', protect, updateProductQuantity);
router.post('/merge', protect, mergeGuestCart);
router.put('/apply-coupon', protect, applyCouponToCart);
router.post('/create-fake-cart', protect, createFakeCart);
module.exports = router;