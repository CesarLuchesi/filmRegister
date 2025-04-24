import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilm } from './filmsServices';

export const getFilms = createAsyncThunk(
  'films/getFilms',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFilm();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);


const filmSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.loading = false;
      })
      .addCase(getFilms.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default filmSlice.reducer;