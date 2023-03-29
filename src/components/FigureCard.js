import "../css/figure-card.css";
import { useState } from "react";
import MyImage from "./MyImage";

function FigureCard({ figure, onDelete }) {
  // FIXME - usuwanie przeniesc do edycji figurki
  const handleClick = () => {
    onDelete(figure.id);
  };

  const [figImage, setFigImage] = useState(
    `./imagesMinifigure/${figure.number}.png`
  );
  const [imageDescription, setImageDescription] = useState(figure.mainName);

  const imageExists = require("image-exists");
  imageExists(figImage, function (exists) {
    if (!exists) {
      setFigImage("./bricklink.png");
      setImageDescription("No image available");
    }
  });

  return (
    <div className="container">
      <div className="name">
        <span className="cell-text">{figure.mainName}</span>
      </div>
      <div className="wrapper">
        <MyImage imageUrl={figImage} imageDescription={imageDescription} />
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
