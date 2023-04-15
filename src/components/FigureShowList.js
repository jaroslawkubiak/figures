import { useState } from "react";
import "../css/figure-card.css";

import showFigureImage from "../js/showFigureImage";

function FigureShowList({ figure, clickedImage, onModal, onEdit }) {
  const showImage = showFigureImage(figure);
  const [figImage, setFigImage] = useState(showImage.url);

  return (
    <div className="list-container">
      <div
        className="list-img cursor-pointer"
        onClick={() => onModal(figure, clickedImage)}
      >
        <img
          src={figImage}
          alt={showImage.description}
          title={showImage.description}
          className="list-figure-img"
        />
      </div>
      <div className="list-wrapper">
        <div
          className="list-item letter-spacing cursor-pointer color-grogu text-underline"
          onClick={() => onEdit(figure)}
        >
          <h3>{figure.mainName}</h3>{" "}
        </div>
        <div className="list-item">
          <h4>{figure.additionalName}</h4>{" "}
        </div>
        <div className="list-item">
          {figure.number} - {figure.releaseYear}
        </div>
        <div className="list-item">Series : {figure.series}</div>
        <div className="list-item">Purchase Date : {figure.purchaseDate}</div>
      </div>
    </div>
  );
}

export default FigureShowList;
