import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const addFigure = createAsyncThunk('figures/fetch', async req => {
  console.log('dodaje=', req.body);
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;

  const res = await axios.get(`${URL}/api/v1/figures/add`);

  return res.data;
});

export { addFigure };
