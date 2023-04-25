import { useState } from "react";
import "../css/figure-card.css";
import showFigureImage from "../js/showFigureImage";
import parse from "html-react-parser";

function FigureShowList({
  figure,
  clickedImage,
  onModal,
  onEdit,
  isFigureEven,
}) {
  const showImage = showFigureImage(figure);
  const [figImage, setFigImage] = useState(showImage.url);
  // set bricklink logo
  const bricklinkLogo = showFigureImage("");

  const renderedData =
    parse(`<a href="https://www.bricklink.com/v2/catalog/catalogitem.page?M=${figure.number}" target="_blank">
  <img
          src=${bricklinkLogo.url}
          alt="Bricklink catalog"
          title="Bricklink catalog"
          className="r2d2-logo-img"
        />
  </a>`);

  return (
    <div className={`r2d2-container ${isFigureEven || "r2d2-even"}`}>
      <div
        className={`r2d2-img-wrapper cursor-pointer ${isFigureEven || "r2d2-even"}`}
        onClick={() => onModal(figure, clickedImage)}
      >
        <img
          src={figImage}
          alt={showImage.description}
          title={showImage.description}
          className="r2d2-figure-img"
        />
      </div>

      <div className={`r2d2-wrapper font-size-0-8 ${isFigureEven || "r2d2-even align-self-flex-end"} ${!isFigureEven || "align-self-flex-start"}`}>
        <div className={`r2d2-item letter-spacing cursor-pointer`} onClick={() => onEdit(figure)}>
          <p className="font-size-1 color-primary">{figure.mainName}</p>
        </div>
        <div className={`r2d2-item color-secondary ${isFigureEven || "justify-content-start"}`}>{figure.additionalName}</div>
        <div className={`r2d2-item color-secondary ${isFigureEven || "justify-content-start"}`}>
          {figure.number} - {figure.releaseYear}
        </div>
        <div className={`r2d2-item color-secondary ${isFigureEven || "justify-content-start"}`}>Series : {figure.series}</div>
      </div>
      <div className={`r2d2-price color-secondary ${isFigureEven || "r2d2-even"}`}>
        <p>Price</p>
        <p>{figure.purchasePrice} zł</p>
      </div>

      <div className={`r2d2-logo-wrapper ${isFigureEven || "r2d2-even"}`}>
        {renderedData}
      </div>
    </div>
  );
}

export default FigureShowList;