const User = require('../model/userModel');
const Product = require('../model/productModel');
const Cart = require('../model/cartModel');
const Coupon = require('../model/couponModel');
const { faker } = require('@faker-js/faker');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, colour, size, } = req.body;
        const userId = req.user._id;
        // Fetch product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Find or create cart for the user
        let cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

        // Construct new cart item
        const newItem = {
            product: product._id,
            name: product.name,
            qty: quantity,
            image: product.productImage,
            price: product.price,
            colour: colour || product.colours[0],
            size: size || product.sizes[0],

        };

        if (!cart) {
            // No existing cart: create new
            cart = new Cart({
                user: userId,
                cartItems: [newItem],
            });
        } else {
            // Check if item exists in cart
            const existingItemIndex = cart.cartItems.findIndex(item =>
                item.product.toString() === productId
                &&
                item.colour === colour &&
                item.size === size
            );

            if (existingItemIndex !== -1) {
                // If item exists, increase quantity
                cart.cartItems[existingItemIndex].qty += quantity;
            } else {
                // Add new item to cart
                cart.cartItems.push(newItem);
            }
        }
        cart.subTotal = cart.cartItems.reduce((acc, item) => {
            const discount = item.product.discount ? (item.price * (item.product.discount / 100)) : 0;
            return acc + (item.price - discount) * item.qty;
        }, 0);
        cart.tax = parseFloat((cart.subTotal * 0.1).toFixed(2)); // example: 10% tax
        cart.shipping = cart.subTotal > 100 ? 0 : 10; // free shipping over ₹100
        const discountAmount = cart.coupon?.discount
            ? (cart.coupon.discount / 100) * cart.subTotal
            : 0;
        cart.total = parseFloat(
            (cart.subTotal + cart.tax + cart.shipping - discountAmount).toFixed(2)
        );

        // Save the cart
        await cart.save();

        res.status(200).json({ message: "Item Added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json({ message: "Cart found", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });

    }
};

const applyCouponToCart = async (req, res) => {
    try {
        const { coupon } = req.body;
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });


        const validCoupon = await Coupon.findOne({ code: coupon });
        if (!validCoupon) return res.status(400).json({ message: "Invalid coupon coupon" });

        if (cart.coupon && cart.coupon.coupon === validCoupon.code) {
            return res.status(400).json({ message: "Coupon already applied" });
        }
        if (validCoupon.expiresAt && new Date() > validCoupon.expiresAt) {
            return res.status(400).json({ message: "Coupon has expired" });
        }

        if (validCoupon.usageLimit && validCoupon.usedCount >= validCoupon.usageLimit) {
            return res.status(400).json({ message: "Coupon usage limit reached" });
        }

        // Just an example: assume 15% off for this demo
        const discountPercent = validCoupon.discount;

        cart.coupon = {
            coupon: validCoupon.code,
            discount: discountPercent,
        };

        // ReCalculate total
        const postDiscountAmount = (discountPercent / 100) * cart.subTotal;
        cart.total = parseFloat(
            (cart.subTotal + cart.tax + cart.shipping - postDiscountAmount).toFixed(2)
        );



        validCoupon.usedCount += 1;
        await validCoupon.save();
        await cart.save();

        res.status(200).json({ message: "Coupon applied successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.cartItems.findIndex(item =>
            item.product.toString() === productId
        );


        cart.cartItems.splice(itemIndex, 1);
        if (cart.cartItems.length === 0) {
            cart.subTotal = 0;
            cart.tax = 0;
            cart.shipping = 0;
            cart.total = 0;
            cart.coupon = undefined; // Optional: remove coupon
        } else {
            cart.subTotal = cart.cartItems.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
            );
            cart.tax = parseFloat((cart.subTotal * 0.1).toFixed(2));
            cart.shipping = cart.subTotal > 100 ? 0 : 10;
            const discountAmount = cart.coupon?.discount
                ? (cart.coupon.discount / 100) * cart.subTotal
                : 0;
            cart.total = parseFloat(
                (cart.subTotal + cart.tax + cart.shipping - discountAmount).toFixed(2)
            );
        }

        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOneAndDelete({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.status(200).json({ message: "Cart cleared successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateProductQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { qty } = req.body;
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.cartItems.findIndex(item =>
            item.product._id.toString() === productId
        );
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

        cart.cartItems[itemIndex].qty = qty;
        cart.subTotal = cart.cartItems.reduce((acc, item) => {
            const discount = item.product.discount ? (item.price * (item.product.discount / 100)) : 0;
            return acc + (item.price - discount) * item.qty;
        }, 0);
        cart.tax = parseFloat((cart.subTotal * 0.1).toFixed(2));
        cart.shipping = cart.subTotal > 100 ? 0 : 10;
        const discountAmount = cart.coupon?.discount
            ? (cart.coupon.discount / 100) * cart.subTotal
            : 0;
        cart.total = parseFloat(
            (cart.subTotal + cart.tax + cart.shipping - discountAmount).toFixed(2)
        );

        await cart.save();

        res.status(200).json({ message: "Item quantity updated in cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const mergeGuestCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const guestCart = req.body.guestCart || []; // Array of items { productId, qty }

        if (!Array.isArray(guestCart)) {
            return res.status(400).json({ message: "Invalid guest cart format" });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create new cart if none exists
            cart = new Cart({ user: userId, cartItems: [] });
        }

        for (const guestItem of guestCart) {
            const { productId, qty } = guestItem;

            const product = await Product.findById(productId);
            if (!product) continue;

            const existingIndex = cart.cartItems.findIndex(item =>
                item.product.toString() === productId
            );

            if (existingIndex !== -1) {
                // If product exists, update quantity
                cart.cartItems[existingIndex].qty += qty;
            } else {
                // Else add new item
                cart.cartItems.push({
                    product: product._id,
                    name: product.name,
                    qty,
                    image: product.productImage,
                    price: product.price
                });
            }
        }

        // Recalculate totals
        cart.subTotal = cart.cartItems.reduce((acc, item) => {
            const discount = item.product.discount ? (item.price * (item.product.discount / 100)) : 0;
            return acc + (item.price - discount) * item.qty;
        }, 0); cart.tax = parseFloat((cart.subTotal * 0.1).toFixed(2));
        cart.shipping = cart.subTotal > 100 ? 0 : 10;
        const discount = cart.coupon?.discount ? (cart.coupon.discount / 100) * cart.subTotal : 0;
        cart.total = parseFloat((cart.subTotal + cart.tax + cart.shipping - discount).toFixed(2));

        await cart.save();

        res.status(200).json({ message: "Cart merged successfully", cart });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// for creating a fake cart //
const createFakeCart = async (req, res) => {
    try {
        // Optionally accept a user ID via query or default to the first user
        const userId = req.query.userId || (await User.findOne())?._id;

        if (!userId) return res.status(400).json({ message: 'No user found or provided.' });

        const products = await Product.find().limit(10);

        if (!products.length) {
            return res.status(400).json({ message: 'No products found. Please seed products first.' });
        }

        // Randomly pick 3-5 products
        const numberOfItems = faker.number.int({ min: 2, max: 5 });

        const cartItems = Array.from({ length: numberOfItems }).map(() => {
            const product = faker.helpers.arrayElement(products);
            const qty = faker.number.int({ min: 1, max: 3 });

            return {
                product: product._id,
                name: product.name,
                qty,
                image: product.productImage,
                price: product.price,
            };
        });

        const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        const tax = parseFloat((subTotal * 0.1).toFixed(2)); // 10% tax
        const shipping = subTotal > 100 ? 0 : 10;

        const total = parseFloat((subTotal + tax + shipping).toFixed(2));

        const cart = new Cart({
            user: userId,
            cartItems,
            subTotal,
            tax,
            shipping,
            total,
        });

        await cart.save();

        res.status(201).json({ message: 'Fake cart created', cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    addToCart,
    getCartItems,
    applyCouponToCart,
    removeFromCart,
    clearCart,
    updateProductQuantity,
    mergeGuestCart,
    createFakeCart


};
