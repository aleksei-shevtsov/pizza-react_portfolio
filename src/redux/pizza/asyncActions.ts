import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzas_status',
  async (params) => {
    const { order, categoryId, sortBy, search, currentPage } = params;

    if (search) {
      const { data } = await axios.get<Pizza[]>(
        `https://63db9a41a3ac95cec5a5c8c6.mockapi.io/items?page=1&limit=4&sortBy=${sortBy}${order}${search}`,
      );
      return data;
    }

    if (!sortBy && !currentPage) {
      const { data } = await axios.get(
        `https://63db9a41a3ac95cec5a5c8c6.mockapi.io/items?page=1&limit=4&0&sortBy=rating&order=desc`,
      );
      return data;
    }

    const { data } = await axios.get<Pizza[]>(
      `https://63db9a41a3ac95cec5a5c8c6.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}${order}${search}`,
    );

    return data;
  },
);
