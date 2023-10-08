import axios from 'axios';

const addFigureToDB = async figure => {
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;
  const res = await axios.post(`${URL}/api/v1/figures/add`, figure);

  return res.data;
};

export default addFigureToDB;
