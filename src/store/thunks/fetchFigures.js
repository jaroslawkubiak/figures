import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchFigures = createAsyncThunk('figures/fetch', async () => {
  console.log('pobieram dane');
  const res = await axios.get('http://127.0.0.1:3001/api/v1/figures');
  
  await pause(1000);
  return res.data;
});

const pause = duration => {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
};

export { fetchFigures };
