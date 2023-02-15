import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetch_pizzas = createAsyncThunk('pizza/fetch_pizzas_status', async (params) => {
  const { order, category, sortBy, search, current_page } = params;
  const { data } = await axios.get(
    `https://63db9a41a3ac95cec5a5c8c6.mockapi.io/items?page=${current_page}&limit=4&${category}&sortBy=${sortBy}${order}${search}`,
  );
  return data;
});

const initialState = {
  items_: [],
  status_: 'loading', // loading | success | error
};

const pizza_slice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    set_items(state, action) {
      state.items_ = action.payload;
    },
  },
  extraReducers: {
    [fetch_pizzas.pending]: (state) => {
      state.status_ = 'loading';
      state.items_ = [];
    },
    [fetch_pizzas.fulfilled]: (state, action) => {
      state.items_ = action.payload;
      state.status_ = 'success';
    },
    [fetch_pizzas.rejected]: (state) => {
      state.status_ = 'error';
      state.items_ = [];
    },
  },
});

export const select_pizza_data = (state) => state.pizza;

export const { set_items } = pizza_slice.actions;

export default pizza_slice.reducer;
