import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total_price: 0,
  items_: [],
};

const cart_slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add_item(state, action) {
      const findItem = state.items_.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items_.push({
          ...action.payload,
          count: 1,
        });
      }
      state.total_price = state.items_.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minus_item(state, action) {
      const findItem = state.items_.find((obj) => obj.id === action.payload);
      console.log(findItem.count);
      if (findItem) {
        findItem.count--;
      }
    },

    remove_item(state, action) {
      state.items_.filter((object) => object.id !== action.payload);
    },
    clear_items(state) {
      state.items_ = [];
      state.total_price = 0;
    },
  },
});

export const select_cart = (state) => state.cart;
export const select_cart_item_by_id = (id) => (state) =>
  state.cart.items_.find((obj) => obj.id === id);

export const { add_item, minus_item, remove_item, clear_items } = cart_slice.actions;

export default cart_slice.reducer;
