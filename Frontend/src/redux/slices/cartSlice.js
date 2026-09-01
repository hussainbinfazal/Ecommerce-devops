import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';
import { setStorageItem, removeStorageItem } from '../../lib/helper';

const getCartItems = () => {
    try {
      if (typeof window === 'undefined') return [];
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (err) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
      return [];
    }
  };

const initialState = {
    loading: false,
    error: null,
    cartItems: getCartItems(),
    totalAmount: 0,
    cart:{},
    guestCartItems: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('guestCart')) || [] : [],
    guestCartDetails: 0,
    isShown: false,
    isShown: false
};

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
    try {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await axiosInstance.get('/cart/get', config);
        
        return response.data;
    } catch (error) {
        // toast.error(error.response.data.message);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({productId,quantity,colour,size},{rejectWithValue}) => {
    try {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await axiosInstance.post('/cart/add', { productId, quantity, colour, size }, config);
        return response.data;
    } catch (error) {
        // toast.error(error || error.response.data.message);
    }
})
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId,{rejectWithValue}) => {
    try {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await axiosInstance.delete(`/cart/remove/${productId}`, config);
        return response.data;
    } catch (error) {
        // toast.error(error.response.data.message);
    }
})

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
    try {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await axiosInstance.delete('/cart/clear', config);
        return response.data;
    } catch (error) {
        // toast.error(error.response.data.message);
    }
})
export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({ productId, qty },{rejectWithValue}) => {
    
    try {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await axiosInstance.put(`/cart/update/${productId}`, { qty }, config);
        return response.data;
    } catch (error) {
        // toast.error(error.response.data.message);
    }
})
export const checkoutCart = createAsyncThunk('cart/checkoutCart', async ({},{rejectWithValue}) => {
    try {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await axiosInstance.post('/cart/checkout', {}, config);
        return response.data;
    } catch (error) {
        // toast.error(error.response.data.message);
    }
})
// Merge Cart Controller //
export const mergeGuestCart = createAsyncThunk(
    'cart/mergeGuestCart',
    async (guestCart, { rejectWithValue }) => {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        // Check if guestCart is empty
        if (guestCart.length === 0) {
            return rejectWithValue('Guest cart is empty.');
        }
        try {
            // console.log('Merging guest cart:', guestCart);
            const response = await axiosInstance.post('/cart/merge', { guestCart }, config);
            // toast.success('Guest cart merged successfully!');
            return response.data.cart; 
        } catch (error) {
            // toast.error('Failed to merge guest cart.');
            return rejectWithValue(
                error.response?.data?.message || 'An error occurred'
            );
        }
    }
);


export const updateCouponStatus = createAsyncThunk('cart/updateCouponStatus', async(coupon,{rejectWithValue}) => {
    try {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await axiosInstance.put('/cart/apply-coupon', { coupon }, config);
        return response.data;
    } catch (error) {
        // toast.error(error.response.data.message);
    }
}
);
const calculateGuestCart = (items = [], coupon = null, shipping = 50, taxRate = 0.1) => {
    // Subtotal before any discount
    const subTotal = items.reduce((acc, item) => {
      const itemTotal = item.price * (item.qty || 1);
      return acc + itemTotal;
    }, 0);
  
    // Total discount from product-level discounts (if any)
    const productDiscount = items.reduce((acc, item) => {
      const itemDiscount = item.discount ? (item.price * (item.discount / 100)) * (item.qty || 1) : 0;
      return acc + itemDiscount;
    }, 0);
  
    // Coupon discount (e.g. 10% off subtotal)
    const couponDiscount = coupon?.discount ? (subTotal * (coupon.discount / 100)) : 0;
  
    // Apply tax on (subtotal - discounts)
    const taxableAmount = subTotal - productDiscount - couponDiscount;
    const tax = taxableAmount * taxRate;
  
    // Final total
    const total = taxableAmount + tax + shipping;
  
    return {
      subTotal: Math.ceil(subTotal),
      productDiscount: Math.floor(productDiscount),
      coupon: coupon?.coupon || null,
      couponDiscount: Math.floor(couponDiscount),
      tax: Math.floor(tax),
      shipping: Math.ceil(shipping),
      total: Math.floor(total),
    };
  };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setGuestCart(state, action) {
            state.guestCartItems = action.payload;
            state.guestCartSubtotal = calculateGuestSubtotal(state.guestCartItems);
            setStorageItem('guestCart', state.guestCartItems);
        },
        addToGuestCart(state, action) {
            const item = action.payload;
            const index = state.guestCartItems.findIndex(i => i.product === item.product);

            state.guestCartItems.includes(item) ? state.guestCartItems[index].qty++ : state.guestCartItems.push(item);

            state.guestCartDetails= calculateGuestCart(state.guestCartItems);

            setStorageItem('guestCart', state.guestCartItems);
        },
        removeFromGuestCart(state, action) {
            const productId = action.payload._id;
            const removedItem = state.guestCartItems.find(item => item?._id === productId);
            if (removedItem) {
                state.guestCartItems = state.guestCartItems.filter(item => item?._id !== productId);
            }
            setStorageItem('guestCart', state.guestCartItems);
        },
        clearGuestCart(state) {
            state.guestCartItems = [];
            state.guestCartSubtotal = 0;
            removeStorageItem('guestCart');
        },
        fetchGuestCart(state) {
            if (typeof window !== 'undefined') {
                const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
                state.guestCartItems = guestCart;
            }
        },
        clearCartItems(state) {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalItems = 0;
            removeStorageItem('guestCart');
        },
        resetDeleteFlag: (state) => {
            state.isDeleted = false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.loading = false;
            const cart = action.payload.cart;
            const cartItems = action.payload.cart.cartItems;
            state.cartItems = cartItems;
            setStorageItem('cart', action.payload.cart.cartItems);
            state.isShown = true;
            state.cart = cart;
        });
        builder.addCase(fetchCartItems.rejected, (state) => {
            state.loading = false;
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalItems = 0;
        });
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.cart.cartItems;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
            state.isShown = true;
        });
        builder.addCase(addToCart.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(removeFromCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
            state.isShown = true;
        });
        builder.addCase(removeFromCart.rejected, (state) => {
            state.loading = false;
        }); builder.addCase(clearCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.cartItems;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
            state.isShown = true;
        });
        builder.addCase(clearCart.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
            state.isShown = true;
        });
        builder.addCase(updateCartItemQuantity.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(checkoutCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(checkoutCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.cartItems;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
            state.isShown = true;
        });
        builder.addCase(checkoutCart.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(mergeGuestCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(mergeGuestCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.cartItems;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
            state.guestCartItems = [];
            state.guestCartSubtotal = 0;
            removeStorageItem('guestCart');
            state.isShown = true;
        });
        builder.addCase(mergeGuestCart.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateCouponStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCouponStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            state.cartItems = action.payload.cart.cartItems;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
            state.coupon = action.payload.coupon;
            state.isShown = true;
        });
        builder.addCase(updateCouponStatus.rejected, (state) => {
            state.loading = false;
        });
    }
})

export const {
    setGuestCart,
    addToGuestCart,
    removeFromGuestCart,
    clearGuestCart,
    fetchGuestCart,
    clearCartItems,
    resetDeleteFlag
} = cartSlice.actions;
export default cartSlice.reducer;