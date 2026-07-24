const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/isAuthenticated');
const {
 
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    deleteOrder,
    generateFakeOrders,
    markOrderAsPaid,
    updateOrderStatus,
    cancelOrder,
    exchangeOrder,
    verifyOrder
    
} = require('../controllers/orderController');


router.post('/', protect, createOrder);
router.post('/verify', protect, verifyOrder);
router.get('/all', protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.get('/order/:orderId', protect, getOrderById);
router.delete('/:orderId', protect, admin, deleteOrder);      
router.put('/status/:orderId',protect,admin,updateOrderStatus);
router.put('/:orderId/deliver', protect, admin, updateOrderToDelivered);
router.post('/generate-fake-orders', protect, admin, generateFakeOrders);
router.put('/mark-paid/:orderId', protect,admin, markOrderAsPaid);
router.put('/cancel/:orderId', protect, cancelOrder);
router.put('/exchange/:orderId', protect, exchangeOrder);

module.exports = router;