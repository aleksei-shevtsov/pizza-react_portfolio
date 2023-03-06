import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sortBy: {
    name: 'popularity',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sortBy = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sortBy = action.payload.sortBy;
        state.currentPage = action.payload.currentPage;
        state.categoryId = action.payload.categoryId;
      } else {
        state.sortBy = {
          name: 'popularity',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
        state.currentPage = 1;
        state.categoryId = 0;
      }
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
