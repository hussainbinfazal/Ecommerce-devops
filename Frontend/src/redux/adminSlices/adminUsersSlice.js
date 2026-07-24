import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';


const initialState = {
    loading: false,
    error: null,
    users: [],
    adminUsers: [],
    isShown: false
};
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
    try {
        const response = await axiosInstance.get('/users/all');

        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
});
export const updateUserToAdmin = createAsyncThunk('admin/updateUserToAdmin', async ({ userId, newStatus }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axiosInstance.put(`/users/update/${userId}`, { newStatus }, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Login failed'
        );
    }

});
export const deleteUserByAdmin = createAsyncThunk('admin/deleteUser', async (userId, { rejectWithValue }) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axiosInstance.delete(`/users/delete/${userId}`, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Login failed'
        );
    }
})
export const adminUsersSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetDeleteFlag: (state) => {
            state.isDeleted = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload
            state.adminUsers = action.payload.adminUsers;
            state.isShown = true;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateUserToAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserToAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.isShown = true;

        });
        builder.addCase(updateUserToAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(deleteUserByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUserByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.isShown = true;
            state.users = state.users.filter((user) => user._id !== action.payload);
        });
        builder.addCase(deleteUserByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})
export const { resetDeleteFlag } = adminUsersSlice.actions;
export default adminUsersSlice.reducer; 