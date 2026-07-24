const mongoose = require('mongoose');

const Coupon = require('./couponModel');
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true, min: 1 },
            image: { type: String, required: true },
            price: { type: Number, required: true, min: 0 },
            colour: { type: String, required: true,},
            size: { type: String, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    subTotal: {
        type: Number,
        default: 0,
        min: 0,
    },
    tax: {
        type: Number,
        default: 0,
        min: 0,
    },
    shipping: {
        type: Number,
        default: 0,
        min: 0,
    },
    total: {
        type: Number,
        default: 0,
        min: 0,
    },  
    coupon: {
        coupon: { type: String, unique: true },
        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100, // assuming percentage
        },
    },
}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
