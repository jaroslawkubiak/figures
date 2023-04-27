import bricklinkLogo from "../bricklink.png";

function showFigureImage(figure) {
  let fileName = {
    url: bricklinkLogo,
    description: figure.MainName,
  };
  try {
    fileName.url = require(`../imagesMinifigure/${figure.number}.png`);
    fileName.description = figure.mainName;
  } catch (error) {
    fileName.url = bricklinkLogo;
    fileName.description = "No image";
  }

  return fileName;
}

export default showFigureImage;
