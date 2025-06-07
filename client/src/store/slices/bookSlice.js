import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/books');
      return response.data;
    } catch {
      return rejectWithValue('Failed to load books');
    }
  }
);

// ✅ NEW — fetch book by ID
export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/books/${id}`);
      return response.data;
    } catch {
      return rejectWithValue('Failed to fetch book by ID');
    }
  }
);

const initialState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // ✅ fetchBookById handlers
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
