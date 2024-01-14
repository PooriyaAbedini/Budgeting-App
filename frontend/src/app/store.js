import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice'
import authReducer from '../features/users/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware)

});
