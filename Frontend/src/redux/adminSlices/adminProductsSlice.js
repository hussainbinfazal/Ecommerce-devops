import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';


const initialState = {
    loading: false,
    error: null,
    products: [],
    product: null,
    success: false,
    isShown: false
};

export const createProduct = createAsyncThunk('adminProducts/createProduct', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.post('/products', formData, config);
        toast.success('Product created successfully!');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message || "Failed to create product.");
        throw error;
    }
});
export const fetchProducts = createAsyncThunk('adminProducts/fetchProducts', async () => {
    
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.get('/products',config);
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const fetchProduct = createAsyncThunk('adminProducts/fetchProduct', async (productId, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.get(`/products/${productId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateProduct = createAsyncThunk('adminProducts/updateProduct', async ({ productId, productData }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.put(`/products/${productId}`, productData, config);
        toast.success('Product updated successfully!');
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message || "Failed to update product.");
        throw error;
    }
});

export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct', async (productId, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        };
        const response = await axiosInstance.delete(`/products/${productId}`, config);
        toast.success('Product deleted successfully!');
        return response.data;
    } catch (error) {
        throw error;
    }
});



export const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {
        resetDeleteFlag: (state) => {
            state.isDeleted = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload;
            state.products.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.isShown = true;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.isShown = true;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.products.findIndex(
                (product) => product._id === action.payload._id
            );
            if (index !== -1) {
                state.products[index] = action.payload;
            }
            state.isShown = true;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.isShown = true;
            state.products = state.products.filter(product => product._id !== action.payload._id);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }
})
export const { resetDeleteFlag } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;
