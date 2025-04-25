import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filmService } from './filmService';

const initialState = {
  films: [],
  status: 'idle',
  error: null,
};

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await filmService.getFilms();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = filmSlice.actions;
export default filmSlice.reducer; 