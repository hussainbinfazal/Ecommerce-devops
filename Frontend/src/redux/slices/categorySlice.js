import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';



const initialState = {
    categories: {},
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const response = await axiosInstance.get('/categories', config);
        return response.data;
    } catch (error) {
        throw error;
    }
});


const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.categories = false;
        });
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.categories = false;
        });
    },
});

export default categorySlice.reducer;