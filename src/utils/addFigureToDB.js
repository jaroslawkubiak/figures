import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const addFigureToDB = async figure => {
  try {
    const BASE_URL = createBaseUrl();
    const res = await axios.post(`${BASE_URL}api/v1/figures/add`, figure);
    return res.data;
  } catch (err) {
    console.log(`Error adding figure: ${err}`);
  }
};

export default addFigureToDB;
