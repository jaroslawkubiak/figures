import axios from 'axios';

const deleteFigureFromDB = async figureId => {
  const URL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}`;
  await axios.delete(`${URL}/api/v1/figures/delete/${figureId}`);
};

export default deleteFigureFromDB;
