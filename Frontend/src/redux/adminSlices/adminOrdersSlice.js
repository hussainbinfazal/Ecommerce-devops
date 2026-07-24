import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify'



const initialState = {
    loading: false,
    error: null,
    orders: [],
    order: null,
    isShown: false
};

export const fetchOrders = createAsyncThunk('admin/fetchOrders', async () => {


    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.get('/orders/all',config);
        
        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(message);
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
});
export const fetchSingleOrder = createAsyncThunk('admin/fetchSingleOrders', async ( orderId ) => {
    try {
        const response = await axiosInstance.get(`/orders/order/${orderId}`);

        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
});

export const updatePaymentStatus = createAsyncThunk('admin/updatePaymentStatus', async ({ orderId, paymentStatus },{ rejectWithValue }) => {
    try {
       const config = {  
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        } 
        const response = await axiosInstance.put(`/orders/mark-paid/${orderId}`,{paymentStatus},config);
        toast.success('Payment Status Updated Successfully');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
});
export const updateOrderStatus = createAsyncThunk('admin/updateOrderStatus', async ({ orderId, orderStatus },{ rejectWithValue }) => {
    try {
        const  config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }
        const response = await axiosInstance.put(`/orders/status/${orderId}`, { orderStatus },config);
        toast.success('Order Status Updated Successfully');
        return response.data;
    } catch (error) {
       toast.error(error.response.data.message);
    }
});


export const deleteOrderByAdmin = createAsyncThunk('admin/deleteOrderByAdmin', async (orderId) => {
    try {
        const response = await axiosInstance.delete(`/Orders/delete/${orderId}`);
        toast.success('Order Deleted Successfully');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
});

export const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState,
    reducers: {
        resetDeleteFlag: (state) => {
            state.isDeleted = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
            state.error = null;
        });
        // update status Reducers
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false;

        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // delete Order reducers
        builder.addCase(deleteOrderByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteOrderByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter((Order) => Order._id !== action.payload);
        });
        builder.addCase(deleteOrderByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // fetch single order reducers
        builder.addCase(fetchSingleOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSingleOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        });
        builder.addCase(fetchSingleOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})
export const { resetDeleteFlag } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;