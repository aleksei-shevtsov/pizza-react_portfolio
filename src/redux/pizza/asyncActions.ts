import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzas_status',
  async (params) => {
    const { order, category, sortBy, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63db9a41a3ac95cec5a5c8c6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${order}${search}`,
    );

    return data;
  },
);
