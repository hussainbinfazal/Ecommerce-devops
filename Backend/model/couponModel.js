const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true, unique: true }, // e.g. "WELCOME10"
    discount: { type: Number, required: true }, // e.g. 10 (means 10%)
    expiresAt: { type: Date }, // optional
    usageLimit: { type: Number }, // optional
    usedCount: { type: Number, default: 0 }, // optional
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;    