import { useState } from "react";
import "../css/figure-card.css";

import showFigureImage from "../js/showFigureImage";

function FigureCard({ figure, clickedImage, onClick }) {
  const handleClick = (figure, clickedImage) => {
    onClick(figure, clickedImage);
  };

  const showImage = showFigureImage(figure);
  const [figImage, setFigImage] = useState(showImage.url);

  return (
    <div className="container">
      <div className="name">
        <span className="cell-text">{figure.mainName}</span>
      </div>
      <div className="wrapper">
        <img
          src={figImage}
          alt={showImage.description}
          title={showImage.description}
          className="figure-img cursor-pointer"
          onClick={() => handleClick(figure, clickedImage)}
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
