const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/isAuthenticated');
const {getProducts, getProductById, deleteProduct, updateProduct, createProduct, seedFakeProducts , allLikedProducts, likeProducts} = require('../controllers/productControllers');
const upload = require('../uploads/productImages/productImages');

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.delete('/:productId', protect, admin, deleteProduct);
router.put('/:productId', protect, admin,upload.array('productImages',12), updateProduct);
router.post('/', protect, admin,upload.array('productImages',12), createProduct);
router.post('/fake', seedFakeProducts);


// Liked products Routes
router.get('/liked', protect, admin, allLikedProducts);
router.post('/like/:productId', protect, likeProducts);

module.exports = router;