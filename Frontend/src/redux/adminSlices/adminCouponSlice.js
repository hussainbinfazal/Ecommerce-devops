import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';



const initialState = {
    loading: false,
    error: null,
    coupons: [],
    coupon:{},
    isShown: false
};

export const fetchCoupons = createAsyncThunk('coupon/fetchCoupons', async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.get('/coupons/get-coupons', config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
        }
    }
})

export const createCoupon = createAsyncThunk('coupon/createCoupon', async (couponData , { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.post('/coupons/create-coupon', { couponData }, config);
        toast.success('Coupon created successfully!');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})
export const deleteCoupon = createAsyncThunk('coupon/deleteCoupon', async (couponId, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.delete(`/coupons/delete-coupon/${couponId}`, config);
        toast.success('Coupon deleted successfully!');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})

export const updateCoupon= createAsyncThunk('coupon/updateCoupon', async ({couponId,couponData},{rejectWithValue}) => {
   

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.put(`/coupons/update-coupon/${couponId}`, { couponData }, config);
        toast.success('Coupon updated successfully!');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})


export const fetchCouponByUser = createAsyncThunk('coupon/fetchCouponByUser', async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.get('/cart', config);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})




const adminCouponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        resetDeleteFlag: (state) => {
            state.isDeleted = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoupons.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCoupons.fulfilled, (state, action) => {
            state.loading = false;
            state.coupons = action.payload;
            state.error = null;
            state.isShown = true;
        });
        builder.addCase(fetchCoupons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(createCoupon.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCoupon.fulfilled, (state, action) => {
            state.loading = false;
            state.coupon = action.payload;
            state.error = null;
            state.isShown = true;
        });
        builder.addCase(createCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(deleteCoupon.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.loading = false;
            state.coupon = action.payload;
            state.error = null;
            state.isShown = true;
        });
        builder.addCase(deleteCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateCoupon.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            state.loading = false;
            state.coupon = action.payload;
            state.error = null;
            state.isShown = true;
        });
        builder.addCase(updateCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchCouponByUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCouponByUser.fulfilled, (state, action) => {
            state.loading = false;
            state.coupon = action.payload;
            state.error = null;
            state.isShown = true;
        });
        builder.addCase(fetchCouponByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const { resetDeleteFlag } = adminCouponSlice.actions;
export default adminCouponSlice.reducer;