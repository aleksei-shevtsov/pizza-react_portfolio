import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category_id: 0,
  current_page: 1,
  sort_: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  search_value: '',
};

const filter_slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    set_category_id(state, action) {
      console.log(action);
      state.category_id = action.payload;
    },
    set_sort(state, action) {
      state.sort_ = action.payload;
    },
    set_current_page(state, action) {
      state.current_page = action.payload;
    },
    set_filters(state, action) {
      state.sort_ = action.payload.sort;
      state.current_page = Number(action.payload.currentPage);
      state.category_id = Number(action.payload.categoryId);
    },
    change_search: (state, action) => {
      state.search_value = action.payload;
    },
    clear_search: (state) => {
      state.search_value = '';
    },
  },
});

export const {
  set_category_id,
  set_sort,
  set_current_page,
  set_filters,
  change_search,
  clear_search,
} = filter_slice.actions;

export default filter_slice.reducer;
