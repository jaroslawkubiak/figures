import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const editFigureInDB = async figure => {
  try {
    const BASE_URL = createBaseUrl();
    const res = await axios.put(`${BASE_URL}api/v1/figures/${figure.id}`, figure);
    return res.data;
  } catch (err) {
    console.log(`🔥 ERROR editing figure: ${err}`);
  }
};

export default editFigureInDB;
