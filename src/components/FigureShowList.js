import { useState } from "react";
import "../css/figure-card.css";

import showFigureImage from "../js/showFigureImage";

function FigureShowList({ figure, clickedImage, onClick, onEdit }) {
  const showImage = showFigureImage(figure);
  const [figImage, setFigImage] = useState(showImage.url);

  return (
    <div className="list-container">
      <div className="list-img">
        <img
          src={figImage}
          alt={showImage.description}
          title={showImage.description}
          className="list-figure-img cursor-pointer"
          onClick={() => onClick(figure, clickedImage)}
        />
      </div>
      <div className="list-wrapper">
        <div className="list-item cursor-pointer" onClick={() => onEdit(figure)}>
          <h2>{figure.mainName}</h2>{" "}
        </div>
        <div className="list-item">
          <h2>{figure.additionalName}</h2>{" "}
        </div>
        <div className="list-item">
          {figure.number} - {figure.releaseYear}
        </div>
        <div className="list-item">Series : {figure.series}</div>
        <div className="list-item">Price : {figure.purchasePrice} zł</div>
      </div>
    </div>
  );
}

export default FigureShowList;
