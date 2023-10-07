import axios from 'axios';
const getFigureInfo = async reqFigure => {
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;

  const res = await axios.get(`${URL}/api/v1/figures/getFigureInfo/${reqFigure}`);
  return res.data;
};

export { getFigureInfo };
