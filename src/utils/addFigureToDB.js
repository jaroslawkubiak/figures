import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const addFigureToDB = async figure => {
  const BASE_URL = createBaseUrl();
  const res = await axios.post(`${BASE_URL}api/v1/figures/add`, figure);

  return res.data;
};

export default addFigureToDB;
