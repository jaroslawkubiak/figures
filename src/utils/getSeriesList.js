import axios from 'axios';

const getSeriesList = async () => {
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;
  const res = await axios.get(`${URL}/api/v1/series`);
  const data = res.data.map(el => el.name);
  return data;
};

export default getSeriesList;
