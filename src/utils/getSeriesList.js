import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const getSeriesList = async () => {
  const BASE_URL = createBaseUrl();
  const res = await axios.get(`${BASE_URL}api/v1/series`);
  const data = res.data.map(el => el.name);
  return data;
};

export default getSeriesList;
