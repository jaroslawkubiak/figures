import axios from 'axios';

const editFigureInDB = async figure => {
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;
  const res = await axios.patch(`${URL}/api/v1/figures/edit/${figure.id}`, figure);
  return res.data;
};

export default editFigureInDB;
