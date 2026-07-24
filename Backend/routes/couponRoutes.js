const express = require('express');
const router = express.Router();
const { createCoupon,
    updateCoupon,
    deleteCoupon,
    getCoupons,
    getCouponByUser
} = require('../controllers/couponController');

const { protect, admin } = require('../middlewares/isAuthenticated');

router.post('/create-coupon', protect,admin,createCoupon);
router.put('/update-coupon/:couponId', protect,admin,updateCoupon);
router.delete('/delete-coupon/:couponId', protect,admin,deleteCoupon);
router.get('/get-coupons', protect,admin,getCoupons);
router.get('/get-coupon-by-user/:userId', protect,admin,getCouponByUser);


module.exports = router;