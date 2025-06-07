import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { showNotification } from "./notificationSlice";

// ✅ Завантажити всі обрані книги з токеном
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("No auth token provided");

    try {
      const res = await axios.get("/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load favorites"
      );
    }
  }
);


// ➕ Додати книгу
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (bookId, { rejectWithValue, dispatch, getState }) => {
    try {
      const token = getState().auth.token;
      await axios.post(
        "/favorites",
        { bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(showNotification({ type: "success", message: "Added to favorites" }));
      return bookId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Add failed");
    }
  }
);

// ❌ Видалити книгу
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (bookId, { rejectWithValue, dispatch, getState }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`/favorites/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(showNotification({ type: "success", message: "Removed from favorites" }));
      return bookId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Remove failed");
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addFavorite.fulfilled, (state, action) => {
        const exists = state.books.find((b) => b.id === action.payload);
        if (!exists) state.books.push({ id: action.payload });
      })

      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b.id !== Number(action.payload));
      });
  },
});

export default favoritesSlice.reducer;
