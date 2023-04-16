import { useState } from "react";
import "../css/figure-card.css";

import showFigureImage from "../js/showFigureImage";

function FigureCard({ figure, clickedImage, onModal, onEdit }) {
  const showImage = showFigureImage(figure);
  const [figImage, setFigImage] = useState(showImage.url);

  return (
    <div className="container">
      <div className="name">
        <span
          className="cell-text cursor-pointer color-r2d2-primary text-underline"
          figure={figure}
          onClick={() => onEdit(figure)}
        >
          {figure.mainName}
        </span>
      </div>
      <div
        className="wrapper cursor-pointer"
        onClick={() => onModal(figure, clickedImage)}
      >
        <img
          src={figImage}
          alt={showImage.description}
          title={showImage.description}
          className="figure-img cursor-pointer"
        />
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
