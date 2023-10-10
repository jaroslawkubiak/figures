import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchFigures = createAsyncThunk('figures/fetch', async () => {
  let URL;
  // creating URL for production
  if (process.env.NODE_ENV === 'production') {
    URL = `${process.env.REACT_APP_PRODUCTION_URL}/`;
  }

  //creating URL for development
  if (process.env.NODE_ENV === 'development') {
    URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}/`;
  }
  // console.log(`You are working on ${process.env.NODE_ENV}\nURL=${URL}`);

  const res = await axios.get(`${URL}api/v1/figures`);

  return res.data;
});

// const pause = duration => {
//   return new Promise(resolve => {
//     setTimeout(resolve, duration);
//   });
// };

export { fetchFigures };
