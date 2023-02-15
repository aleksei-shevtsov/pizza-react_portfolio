import { configureStore } from '@reduxjs/toolkit';
import filter from './slices_/filter_slice';
import cart from './slices_/cart_slice';
import pizza from './slices_/pizza_slice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
