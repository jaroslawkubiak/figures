import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getFigureById = createAsyncThunk('figures/fetch', async (req, res) => {
  console.log('thunk id=', req.params.id);
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;
  const result = await axios.get(`${URL}/api/v1/figures/edit`);

  return result.data;
});

export { getFigureById };
