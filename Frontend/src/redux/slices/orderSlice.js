import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';

const initialState = {
    order: null,
    orders: [],
    isShown: false,
    isShown: false
};

export const createOrder = createAsyncThunk(
    '/orders/create',
    async (orderData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axiosInstance.post(
                '/orders',
                orderData,
                config
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Registration failed'
            );
        }
    }
);
export const verifyOrder = createAsyncThunk('orders/verifyOrder', async (orderData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.post('/orders/verify', orderData, config);
        return response.data;

    } catch (error) {
        console.log('error in the verify order reducer in orderSlice', error);
        return rejectWithValue(
            error.response?.data?.message || 'Order verification failed'
        );
    }



})
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.delete(`/orders/${orderId}`, config);
        toast.success('Order deleted successfully!');
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const getMyOrders = createAsyncThunk('orders/getMyOrders', async (userId, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.get(`/orders/myorders`, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch orders'
        );
    }
});
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetDeleteFlag: (state) => {
            state.isDeleted = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
            state.isShown = true;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMyOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.isShown = true;
        });
        builder.addCase(getMyOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMyOrders.pending, (state, action) => {
            state.loading = true;
            state.isShown = false;
            state.error = action.payload;
        });
        
    }

});

export const { clearError, resetDeleteFlag } = orderSlice.actions;
export default orderSlice.reducer;
