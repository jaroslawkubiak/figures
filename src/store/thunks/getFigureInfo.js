import axios from 'axios';
import createBaseUrl from '../../utils/createBaseUrl';

const getFigureInfo = async reqFigure => {
  try {
    const BASE_URL = createBaseUrl();
    const res = await axios.get(`${BASE_URL}api/v1/figures/getFigureInfo/${reqFigure}`);
    return res.data;
  } catch (err) {
    console.log(`Error getting figure info: ${err}`);
  }
};

export { getFigureInfo };
