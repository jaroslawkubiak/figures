import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const deleteFigureFromDB = async figureId => {
  const BASE_URL = createBaseUrl();

  await axios.delete(`${BASE_URL}api/v1/figures/delete/${figureId}`);
  console.log(`DELETE FIGURE: ${BASE_URL}api/v1/figures/delete/${figureId}`);
};

export default deleteFigureFromDB;
