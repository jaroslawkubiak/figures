import axios from 'axios';
import createBaseUrl from './createBaseUrl';

async function checkIfImageExist(figure) {
  const BASE_URL = createBaseUrl();

  try {
    // check if image exist
    await axios.get(`${BASE_URL}api/v1/figures/image/${figure.number}.png`, `${figure.number}.png`);
  } catch (err) {
    // image don't exist - update link in DB and download image
    console.log(`🔥 ERROR ${err.request.status}`);
    await axios.patch(`${BASE_URL}api/v1/figures/${figure.id}`, figure);
  }
}
export default checkIfImageExist;
