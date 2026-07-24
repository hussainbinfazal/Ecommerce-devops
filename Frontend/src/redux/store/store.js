// store.js

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Example slice reducer import
import userReducer from '../slices/userSlice';
import productReducer from '../slices/productSlice';
import orderReducer from '../slices/orderSlice';
import adminUsersReducer from '../adminSlices/adminUsersSlice';
import adminOrdersReducer from '../adminSlices/adminOrdersSlice';
import adminProductsReducer from '../adminSlices/adminProductsSlice';
import cartReducer from '../slices/cartSlice';
import wishlistReducer from '../slices/wishlistSlice';
import couponReducer from '../adminSlices/adminCouponSlice';
import categoryReducer from '../slices/categorySlice';
// Create the Redux store here
const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        order: orderReducer,
        admin: adminUsersReducer,
        adminOrders: adminOrdersReducer,
        adminProducts: adminProductsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        coupon: couponReducer,
        categories: categoryReducer
    }
});

export default store;
