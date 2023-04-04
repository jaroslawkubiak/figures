import { useState } from "react";
import MyImage from "./MyImage";
import bricklink from "../bricklink.png";

function FigureCard({ figure }) {
  // TODO - usuwanie przeniesc do edycji figurki
  // const handleClick = () => {
  //   onDelete(figure.id);
  // };

  let fileName;
  try {
    fileName = require(`../imagesMinifigure/${figure.number}.png`);
  } catch (error) {
    // console.error(`Image ${figure.number} doesnt exist`);
    fileName = bricklink;
  }
  const [figImage, setFigImage] = useState(fileName);

  return (
    <div className="container">
      <div className="name">
        <span className="cell-text">{figure.mainName}</span>
      </div>
      <div className="wrapper">
        <MyImage imageUrl={figImage} imageDescription={figure.mainName} />
      </div>
      <div className="number">
        <span className="cell-text">
          {figure.number} - {figure.releaseYear}
        </span>
      </div>
    </div>
  );
}

export default FigureCard;
