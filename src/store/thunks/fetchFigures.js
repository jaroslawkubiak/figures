import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchFigures = createAsyncThunk('figures/fetch', async () => {
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;
  const res = await axios.get(`${URL}/api/v1/figures`);
  return res.data;
});

// const pause = duration => {
//   return new Promise(resolve => {
//     setTimeout(resolve, duration);
//   });
// };

export { fetchFigures };
