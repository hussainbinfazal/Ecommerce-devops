import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';

const initialState = {
    product: null,
    loading: false,
    error: null,
    products: [],
    productsByCategory: [],
    isShown: false,
    likedProducts: [],
    guestLikedProducts: [],
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const res = await axiosInstance.get('/products', config);
        return res.data;
    } catch (error) {
        throw error;
    }
}
);


export const getProductById = createAsyncThunk('products/getProductById', async (productId, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const res = await axiosInstance.get(`/products/${productId}`, config);
        return res.data;
    } catch (error) {
        throw error;
    }
}
);




const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.error = null;
        },
        // getProductsByCategory:(state,action)=>{
        //     const category = action.payload;
        //     state.productsByCategory = state.products.filter(product => product.category === category);
        // },
        clearError: (state) => {
            state.error = null;
        },
        resetDeleteFlag: (state) => {
            state.isDeleted = false;
        },
        filterProductByCategories: (state, action) => {
            const { category, subCategory, option, subOption } = action.payload;
        
        
            let filteredProducts = state.products;
        
            if (category) {
                filteredProducts = filteredProducts.filter(
                    product => product.category?.toLowerCase() === category.toLowerCase()
                );
        
                if (subCategory) {
                    cosnole.logg("Subcategory:", subCategory);
                    filteredProducts = filteredProducts.filter(
                        product => product.subCategory?.toLowerCase() === subCategory.toLowerCase()
                    );
        
                    if (option) {
                        filteredProducts = filteredProducts.filter(
                            product => product.option?.toLowerCase() === option.toLowerCase()
                        );
        
                        if (subOption) {
                            filteredProducts = filteredProducts.filter(
                                product => product.subOption?.toLowerCase() === subOption.toLowerCase()
                            );
                        }
                    }
                }
            }
        
            state.productsByCategory = filteredProducts;
        }
        // ad
        // addToGuestLikedProducts: (state, action) => {
        //     const product = action.payload;
        //     if (!state.guestLikedProducts.some(p => p.product === product.product)) {
        //         state.guestLikedProducts.push(product);
        //         localStorage.setItem('guestLikes', JSON.stringify(state.guestLikedProducts));
        //     }
        // },
        // removeFromGuestLikedProducts: (state, action) => {
        //     state.guestLikedProducts = state.guestLikedProducts.filter(p => p.product !== action.payload);
        //     localStorage.setItem('guestLikes', JSON.stringify(state.guestLikedProducts));
        // },
        // clearGuestLikedProducts: (state) => {
        //     state.guestLikedProducts = [];
        //     localStorage.removeItem('guestLikes');
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
            state.isShown = true;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getProductById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
            state.isShown = true;
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { logout, clearError, resetDeleteFlag, getProductsByCategory, filterProductByCategories } = productSlice.actions;
export default productSlice.reducer;
