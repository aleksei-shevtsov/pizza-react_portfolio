import { configureStore } from '@reduxjs/toolkit';
import cart from './slices_/cart_slice';
import filter from './slices_/filter_slice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});
