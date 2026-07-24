const express = require('express');
const router = express.Router();
const { mergeGuestLikes, fetchWishlist, addToWishlist, removeFromWishlist} = require('../controllers/wishlistControllers');
const { protect } = require('../middlewares/isAuthenticated');

router.post('/merge', protect, mergeGuestLikes);
router.get('/get', protect, fetchWishlist);
router.post('/add/:productId', protect, addToWishlist);
router.delete('/remove/:productId', protect, removeFromWishlist);

// other wishlist routes...

module.exports = router;
