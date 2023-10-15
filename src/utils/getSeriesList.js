import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const getSeriesList = async () => {
  try {
    const BASE_URL = createBaseUrl();
    const res = await axios.get(`${BASE_URL}api/v1/series`);
    const data = res.data.map(el => el.name);
    return data;
  } catch (err) {
    console.log(`Error getting series list: ${err}`);
  }
};

export default getSeriesList;
