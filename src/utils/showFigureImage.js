import bricklinkLogo from '../bricklink.png';

function showFigureImage(figure) {
  let fileName = {
    url: bricklinkLogo,
    description: figure.mainName,
  };
  try {
    fileName.url = require(`../imagesMinifigure/${figure.number}.png`);
  } catch (error) {
    try {
      fileName.url = `https://jaroslawkubiak.pl/portfolio/figures/static/media/${figure.number}.png`;
    } catch (err) {
      // if no image, get img from bricklink
      fileName.url = `https://img.bricklink.com/ItemImage/MN/0/${figure.number}.png`;
    }
  }
  return fileName;
}

export default showFigureImage;
