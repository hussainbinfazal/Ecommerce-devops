const Order = require('../model/orderModel');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Cart = require('../model/cartModel');
const Product = require('../model/productModel');
const Razorpay = require('razorpay');
const User = require('../model/userModel');
const crypto = require('crypto');



const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'id name email')
            .populate('orderItems.product', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "Orders fetched successfully",
            orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name image price');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrderToPaid = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const { id, status, update_time, email_address } = req.body;

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id,
            status,
            update_time,
            email_address
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createOrder = async (req, res) => {

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).send('Razorpay credentials not configured');
    }
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    try {

        const { orderItems, shippingAddress, paymentMethod, phone, email, name, cartId } = req.body;
        const userOfOrder = await User.findById(req.user._id).populate('name email');

        const cartOfUser = await Cart.findOne({ _id: cartId });
        const amount = cartOfUser.total;
        const shortReceipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        const razorpayOptions = {
            amount: amount * 100, // Convert to paisa
            currency: 'INR',
            receipt: shortReceipt
        };

        const razorpayOrder = await razorpay.orders.create(razorpayOptions);

        if (!orderItems || !shippingAddress || !paymentMethod || !phone || !email || !name) {
            return res.status(400).json({ message: 'name,phone,email,,shippingAddress,paymentMethod are required' });
        }

        const { street,
            city,
            state,
            apartment,
            building,
            floor,
            landmark,
            country,
            pinCode } = shippingAddress;


        if (!cartOfUser) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
        } else {
            const order = new Order({
                user: userOfOrder._id,
                orderItems: cartOfUser.cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    colour: item.colour,
                    size: item.size,
                    product: item.product
                })),
                shippingAddress: {
                    address: {

                        city: city,
                        state: state,
                        country: country,
                        street: street || null,
                        apartment: apartment || null,
                        building: building || null,
                        floor: floor || null,
                        landmark: landmark || null,
                        pincode: pinCode,



                    },
                    name: name,
                    phone: phone,
                    email: email,
                    paymentMethod,

                    isPaid: false,
                    isDelivered: false,
                },
                totalPrice: cartOfUser.total,
                paymentMethod: 'Razorpay',
                razorpayOrderId: razorpayOrder.id,
                status: 'Pending',
                total: cartOfUser.total
            });
            const createdOrder = await order.save();
            return res.status(201).json({
                order: createdOrder,
                razorpayOrderId: razorpayOrder.id,
                success: true,
                message: 'pending Order created successfully',
                amount: amount,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const verifyOrder = async (req, res) => {
    try {
        const { orderId, paymentId, signature, cartId } = req.body;
        // console.log('Verifying payment for order:', orderId, 'with paymentId:', paymentId, 'and signature:', signature);
        const userOfOrder = await User.findById(req.user._id).populate('name email');

        const body = orderId + '|' + paymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === signature;
        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
        const order = await Order.findOne({ razorpayOrderId: orderId });
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: paymentId,
            status: 'Completed',
            update_time: new Date().toISOString(),
            email_address: userOfOrder.email

        };
        order.status = 'Completed';

        await order.save();
        if (cartId) {
            const deleteUserCart = await Cart.findByIdAndDelete(cartId)
        };

        return res.status(201).json({
            success: true,
            message: 'Payment verified successfully'
        });

    } catch (error) {
        // console.log('This is the error in the verfiy payment controller ', error);
        return res.status(500).json({ message: error.message });
    }
}

const updateOrderToDelivered = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized as admin' });
        }
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMyOrders = async (req, res) => {
    try {
        console.log('Fetching orders for user:', req.user._id);
        const orders = await Order.find({ user: req.user._id })
            .populate('orderItems.product', 'name image')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await order.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const markOrderAsPaid = async (req, res) => {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    if (paymentStatus === 'Paid') {
        order.isPaid = true;
    } else if (paymentStatus == 'Unpaid') {
        order.isPaid = false;
    }
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
};
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        order.status = 'Cancelled';
        await order.save();
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const returnOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        order.status = 'Returned';
        await order.save();
        res.status(200).json({ message: 'Order returned successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const exchangeOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        order.status = 'Exchange';
        await order.save();
        res.status(200).json({ message: 'Order exchanged successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// // Function to generate fake orders for testing //

const generateFakeOrders = async (req, res) => {
    try {
        const orders = [];
        const count = parseInt(req.query.count) || 10;
        for (let i = 0; i < count; i++) {
            const orderItems = [];

            const itemsCount = faker.number.int({ min: 1, max: 5 });

            for (let j = 0; j < itemsCount; j++) {
                orderItems.push({
                    name: faker.commerce.productName(),
                    qty: faker.number.int({ min: 1, max: 5 }),
                    image: faker.image.urlLoremFlickr({ category: 'products' }),
                    price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
                    product: new mongoose.Types.ObjectId(), // replace with real product IDs if needed
                });
            }

            const totalPrice = orderItems.reduce((total, item) => total + item.price * item.qty, 0);

            const fakeOrder = new Order({
                user: new mongoose.Types.ObjectId(), // replace with real user ID if available
                orderItems,
                shippingAddress: {
                    address: faker.location.streetAddress(),
                    city: faker.location.city(),
                    postalCode: faker.location.zipCode(),
                    country: faker.location.country(),
                },
                paymentMethod: faker.helpers.arrayElement(['PayPal', 'Credit Card', 'Stripe']),
                paymentResult: {
                    id: faker.string.uuid(),
                    status: faker.helpers.arrayElement(['Completed', 'Pending', 'Failed']),
                    update_time: faker.date.recent().toISOString(),
                    email_address: faker.internet.email(),
                },
                totalPrice,
                isPaid: faker.datatype.boolean(),
                paidAt: faker.date.past(),
                isDelivered: faker.datatype.boolean(),
                deliveredAt: faker.date.recent(),
            });

            orders.push(fakeOrder);
        }

        await Order.insertMany(orders);

        res.status(201).json({
            message: 'Fake orders created successfully',
            total: orders.length,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create fake orders' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = orderStatus;
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getOrders, getOrderById, createOrder, updateOrderToPaid, updateOrderToDelivered, deleteOrder, getMyOrders, generateFakeOrders, markOrderAsPaid, updateOrderStatus, cancelOrder, exchangeOrder, verifyOrder };
