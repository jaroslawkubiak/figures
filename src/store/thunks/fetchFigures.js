import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBaseUrl from '../../utils/createBaseUrl';

const fetchFigures = createAsyncThunk('figures/fetch', async () => {
  const BASE_URL = createBaseUrl();
  const res = await axios.get(`${BASE_URL}api/v1/figures`);
  return res.data;
});

export { fetchFigures };
