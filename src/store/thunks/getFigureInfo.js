import axios from 'axios';
import createBaseUrl from '../../utils/createBaseUrl';

const getFigureInfo = async reqFigure => {
  const BASE_URL = createBaseUrl();

  const res = await axios.get(`${BASE_URL}api/v1/figures/getFigureInfo/${reqFigure}`);
  return res.data;
};

export { getFigureInfo };
