import { useState } from "react";
import "../css/figure-card.css";

import showFigureImage from "../js/showFigureImage";

function FigureCard({ figure, clickedImage, onModal, onEdit, onDelete }) {

  const showImage = showFigureImage(figure);
  const [figImage, setFigImage] = useState(showImage.url);

  return (
    <div className="container">
      <div className="name">
        <span
          className="cell-text cursor-pointer"
          figure={figure}
          onClick={() => onEdit(figure)}
        >
          {figure.mainName}
        </span>
      </div>
      <div className="wrapper">
        <img
          src={figImage}
          alt={showImage.description}
          title={showImage.description}
          className="figure-img cursor-pointer"
          onClick={() => onModal(figure, clickedImage)}
        />
      </div>
      <div className="number">
        <span className="cell-text" onClick={() => onDelete(figure)}>
          {figure.number} - {figure.releaseYear}
        </span>
      </div>
    </div>
  );
}

export default FigureCard;
