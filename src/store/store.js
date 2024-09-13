import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postSlice from './postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // 'auth' is the key for the auth slice
    post: postSlice,
  },
});
