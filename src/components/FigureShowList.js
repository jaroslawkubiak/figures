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
        <div className="list-item">{figure.mainName} </div>
        <div>
          {figure.number} - {figure.releaseYear}
        </div>
        <div>Series : {figure.series}</div>
        <div>Price : {figure.purchasePrice} zł</div>
      </div>
    </div>
  );
}

export default FigureShowList;
