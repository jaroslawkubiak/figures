import axios from 'axios';
import createBaseUrl from './createBaseUrl';

const deleteFigureFromDB = async figureId => {
  try {
    const BASE_URL = createBaseUrl();
    return await axios.delete(`${BASE_URL}api/v1/figures/${figureId}`);
  } catch (err) {
    console.log(`Error deleting figure: ${err}`);
  }
};

export default deleteFigureFromDB;
