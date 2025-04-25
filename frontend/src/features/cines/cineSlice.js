import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cineService } from './cineService';

const initialState = {
  cines: [],
  status: 'idle',
  error: null,
};

export const fetchCines = createAsyncThunk(
  'cines/fetchCines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cineService.getCines();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cineSlice = createSlice({
  name: 'cines',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCines.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCines.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cines = action.payload;
      })
      .addCase(fetchCines.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = cineSlice.actions;
export default cineSlice.reducer;
