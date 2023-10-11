import bricklinkLogo from '../bricklink.png';

function showFigureImage(figure) {
  let fileName = {
    url: bricklinkLogo,
    description: figure.MainName,
  };
  try {
    fileName.url = require(`../imagesMinifigure/${figure.number}.png`);
    fileName.description = figure.mainName;
  } catch (error) {
    // if no image, get img from bricklink
    fileName.url = `https://img.bricklink.com/ItemImage/MN/0/${figure.number}.png`;
    fileName.description = figure.mainName;
  }

  return fileName;
}

export default showFigureImage;
