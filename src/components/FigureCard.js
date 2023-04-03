import { useState, useEffect } from "react";
import MyImage from "./MyImage";
import imageExists from "image-exists";
import bricklink from "../bricklink.png";

function FigureCard({ figure }) {
  // TODO - usuwanie przeniesc do edycji figurki
  // const handleClick = () => {
  //   onDelete(figure.id);
  // };
  // const fileName = `../imagesMinifigure/${figure.number}.png`;

  const [figImage, setFigImage] = useState(
    require(`../imagesMinifigure/${figure.number}.png`)
  );

  const [imageDescription, setImageDescription] = useState(figure.mainName);

  useEffect(() => {
    imageExists(figImage, function (exists) {
      if (!exists) {
        setFigImage(bricklink);
        setImageDescription("No image available");
      } 
    });
  }, [figImage]);


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
