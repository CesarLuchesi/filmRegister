import { configureStore } from '@reduxjs/toolkit';
import filmReducer from '../features/films/filmSlice';

 
export const store = configureStore({
  reducer: {
    film: filmReducer,
  },
});