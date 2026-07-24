const Coupon = require('../model/couponModel');
const createCoupon = async (req,res)=>{

    try {
        const {couponData} = req.body;
        const { code, discount, expiresAt, usageLimit } = couponData;
        const userId = req.user._id;
        
    
       
        if (!code || !discount) {
          return res.status(400).json({ message: "Coupon code and discount are required." });
        }
    
        
        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
          return res.status(400).json({ message: "Coupon code already exists." });
        }
    
        const newCoupon = new Coupon({
          code: code.toUpperCase(),
          discount,
          expiresAt: expiresAt ? new Date(expiresAt) : undefined,
          usageLimit,
          createdBy: userId,
        });
    
        await newCoupon.save();
    
        res.status(201).json({
          message: "Coupon created successfully.",
          coupon: newCoupon,
        });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }

};
const updateCoupon = async (req, res) => {
    try {
        const { couponId } = req.params;
        const { couponData } = req.body;
        const { code, discount, expiresAt, usageLimit } = couponData;
        const userId = req.user._id;


        const coupon = await Coupon.findOne({ _id: couponId});
        if (!coupon) return res.status(404).json({ message: "Coupon not found or not owned by the user" });

        coupon.code = code.toUpperCase() || coupon.code;
        coupon.discount = discount || coupon.discount;
        coupon.expiresAt = expiresAt ? new Date(expiresAt) : undefined || coupon.expiresAt;
        coupon.usageLimit = usageLimit || coupon.usageLimit;

        await coupon.save();

        res.status(200).json({
            message: "Coupon updated successfully.",
            coupon,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { couponId } = req.params;
        const userId = req.user._id;
        const coupon = await Coupon.findByIdAndDelete({ _id: couponId });
        if (!coupon) return res.status(400).json({ message: "Coupon not found or not owned by the user" });

        await coupon.save();

        res.status(200).json({ message: "Coupon deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCoupons = async (req, res) => {
    try {
        const userId = req.user._id;
        const coupons = await Coupon.find({});

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCouponByUser = async (req, res) => {
    try {
        const { userId} = req.params;
        const coupons = await Coupon.find({ createdBy: userId });

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCoupons,
    getCouponByUser

};