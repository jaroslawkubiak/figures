import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const getSeriesList = async () => {
  try {
    const BASE_URL = createBaseUrl();
    const res = await axios.get(`${BASE_URL}api/v1/series`);

    if (typeof res.data === 'object') {
      const data = res.data.map(el => el.name);
      return data;
    } else {
      throw new Error('Failed to get series list');
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default getSeriesList;
