import { configureStore } from '@reduxjs/toolkit';
import userProfileSlice from '@/redux/feature/userProfile/userProfileSlice';
import authSlice from '@/redux/feature/auth/authSlice';
import { ecommerceApi } from '@/redux/api';
import passwordVisibilitySlice from '@/redux/feature/password/passwordVisibilitySlice';
import cartSlice from '@/redux/feature/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      userProfile: userProfileSlice,
      [ecommerceApi.reducerPath]: ecommerceApi.reducer,
      auth: authSlice,
      cart: cartSlice,

      passwordVisibility: passwordVisibilitySlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ecommerceApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
