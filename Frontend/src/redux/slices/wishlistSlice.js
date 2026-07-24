import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';

// Async for logged-in users
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosInstance.get('/wishlist/get', config);
    
    return res.data;
  }
  catch (error) {
    toast.error(error.response.data.message);
  }
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosInstance.post(`/wishlist/add/${productId}`, {}, config);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (productId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosInstance.delete(`/wishlist/remove/${productId}`, config);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

// Merge guest likes on login
export const mergeGuestLikes = createAsyncThunk('wishlist/mergeGuestLikes', async (guestLikes) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosInstance.post('/wishlist/merge', { guestLikes }, config);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: JSON.parse(localStorage.getItem('Likes')) || [],
    guestWishlist: JSON.parse(localStorage.getItem('guestLikes')) || [],
    loading: false,
    error: null,
    isShown: false
  },
  reducers: {
    addToGuestWishlist: (state, action) => {
      const { product } = action.payload;

      if (!product?._id) {
        return;
      }

      const exists = state.guestWishlist.some(p => p.product?._id?.toString() === product._id.toString());

      if (!exists) {
        state.guestWishlist.push({ product });
        localStorage.setItem('guestLikes', JSON.stringify(state.guestWishlist));
        toast.success('Added to wishlist');
      } else {
        toast.info('Product already in wishlist');
      }
    },
    removeFromGuestWishlist: (state, action) => {
      const payload = action.payload;
      const targetId = (payload?.product?._id || payload?._id)?.toString();

      if (!targetId) {
        return;
      }

      state.guestWishlist = state.guestWishlist.filter((item) => {
        const itemId = (item?.product?._id || item?.product)?.toString();
        return itemId !== targetId;
      });

      localStorage.setItem('guestLikes', JSON.stringify(state.guestWishlist));
      toast.error('Removed from wishlist');
    },

    clearGuestWishlist: (state) => {
      state.guestWishlist = [];
      localStorage.removeItem('guestLikes');
    },

    fetchGuestWishlist: (state) => {
      const guestWishlist = JSON.parse(localStorage.getItem('guestLikes')) || [];
      state.guestWishlist = guestWishlist;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.removeItem('Likes');
    },
    resetDeleteFlag: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        localStorage.setItem('Likes', JSON.stringify(state.wishlist))
        state.isShown = true;
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
        // toast.error("Failed to fetch wishlist");
      })
      .addCase(mergeGuestLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.guestWishlist = [];
        localStorage.removeItem('guestLikes');
        state.isShown = true;
      });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload.wishlist;
      // toast.success('Added to wishlist');
      state.isShown = true;
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload.wishlist;
      // toast.success('Removed from wishlist');
      state.isShown = true;
    });

    builder.addCase(mergeGuestLikes.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message);
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message);
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message);
    });

  }
});

export const {
  addToGuestWishlist,
  removeFromGuestWishlist,
  clearGuestWishlist,
  fetchGuestWishlist,
  clearWishlist,
  resetDeleteFlag
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
