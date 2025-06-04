import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { showNotification } from './notificationSlice';

const localCart = JSON.parse(localStorage.getItem('cart')) || [];

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch {
      dispatch(showNotification({ type: 'error', message: 'Failed to load cart items' }));
      return rejectWithValue('Failed to fetch cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: localCart,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
    replaceCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
        localStorage.setItem('cart', JSON.stringify(action.payload));
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  replaceCart,
} = cartSlice.actions;

// ❗ Обгортаємо дії з нотифікаціями
export const addToCartWithNotify = (item) => (dispatch) => {
  dispatch(addToCart(item));
  dispatch(showNotification({ type: 'success', message: 'Book added to cart!' }));
};

export const removeFromCartWithNotify = (id) => (dispatch) => {
  dispatch(removeFromCart(id));
  dispatch(showNotification({ type: 'info', message: 'Item removed from cart.' }));
};

export const clearCartWithNotify = () => (dispatch) => {
  dispatch(clearCart());
  dispatch(showNotification({ type: 'info', message: 'Cart cleared.' }));
};

export default cartSlice.reducer;
