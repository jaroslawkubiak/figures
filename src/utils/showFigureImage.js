import axios from 'axios';
import createBaseUrl from './createBaseUrl';
import createImageLink from './createImageLink';

async function showFigureImage(figure) {

  let fileName = createImageLink(figure);
  fileName = { ...fileName, url: null };

  try {
    const BASE_URL = createBaseUrl();
    const res = await axios.get(`${BASE_URL}api/v1/figures/image/${figure.number}.png`, `${figure.number}.png`);
    if (res.status === 200) {
      fileName.url = `https://jaroslawkubiak.pl/portfolio/figures/static/media/${figure.number}.png`;
    }
  } catch (err) {
    // console.log(err);
  }
  return fileName;
}
export default showFigureImage;
