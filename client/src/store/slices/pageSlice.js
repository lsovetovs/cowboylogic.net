import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { showNotification } from './notificationSlice';

export const fetchPageContent = createAsyncThunk(
  'pages/fetchPageContent',
  async (slug, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`/pages/${slug}`);
      return { slug, content: res.data.content };
    } catch {
      const msg = `Failed to load page: ${slug}`;
      dispatch(showNotification({ type: 'error', message: msg }));
      return rejectWithValue(msg);
    }
  }
);

export const updatePageContent = createAsyncThunk(
  'pages/updatePageContent',
  async ({ slug, content, token }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/pages/${slug}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(showNotification({ type: 'success', message: `Saved changes for ${slug}` }));
      return { slug, content: res.data.content };
    } catch {
      const msg = `Failed to update page: ${slug}`;
      dispatch(showNotification({ type: 'error', message: msg }));
      return rejectWithValue(msg);
    }
  }
);

const pageSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageContent.fulfilled, (state, action) => {
        state.pages[action.payload.slug] = action.payload.content;
        state.loading = false;
      })
      .addCase(fetchPageContent.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updatePageContent.fulfilled, (state, action) => {
        state.pages[action.payload.slug] = action.payload.content;
      })
      .addCase(updatePageContent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default pageSlice.reducer;
