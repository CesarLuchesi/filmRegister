import { configureStore } from '@reduxjs/toolkit';
import filmReducer from '../features/films/filmSlice';
import sessionsReducer from '../features/sessions/sessionSlice';
import cineReducer from '../features/cines/cineSlice';

export const store = configureStore({
  reducer: {
    film: filmReducer,
    sessions: sessionsReducer,
    cines: cineReducer,
  },
});