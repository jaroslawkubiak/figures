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
  let cssClassContainer = "r2d2-container";
  let cssClassWrapper = "r2d2-wrapper font-size-0-8";
  let cssClassImg = "r2d2-img-wrapper cursor-pointer";
  let cssClassItem = "r2d2-item color-secondary";
  let cssClassHeader = "r2d2-item letter-spacing cursor-pointer";
  let cssClassLogo = "r2d2-logo-wrapper";
  let cssClassPrice = "r2d2-price color-secondary font-size-0-8";

  if (!isFigureEven) {
    cssClassContainer = "r2d2-container-even";
    cssClassWrapper = "r2d2-wrapper-even font-size-0-8";
    cssClassImg = "r2d2-img-wrapper cursor-pointer r2d2-even";
    cssClassItem = "r2d2-item-even color-secondary";
    cssClassHeader = "r2d2-item-even letter-spacing cursor-pointer";
    cssClassLogo = "r2d2-logo-wrapper r2d2-even";
    cssClassPrice = "r2d2-price-even color-secondary font-size-0-8";
  }

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
    <div className={cssClassContainer}>
      <div
        className={cssClassImg}
        onClick={() => onModal(figure, clickedImage)}
      >
        <img
          src={figImage}
          alt={showImage.description}
          title={showImage.description}
          className="r2d2-figure-img"
        />
      </div>

      <div className={cssClassWrapper}>
        <div className={cssClassHeader} onClick={() => onEdit(figure)}>
          <h3 className="font-size-1 color-primary">{figure.mainName}</h3>
        </div>
        <div className={cssClassItem}>{figure.additionalName}</div>
        <div className={cssClassItem}>
          {figure.number} - {figure.releaseYear}
        </div>
        <div className={cssClassItem}>Series : {figure.series}</div>
      </div>
      <div className={cssClassPrice}>
        <p>Price</p>
        <p>{figure.purchasePrice} zł</p>
      </div>

      <div className={cssClassLogo}>
        {renderedData}
      </div>
    </div>
  );
}

export default FigureShowList;

// return (
//   <div className="list-container">
//     <div
//       className="list-img cursor-pointer"
//       onClick={() => onModal(figure, clickedImage)}
//     >
//       <img
//         src={figImage}
//         alt={showImage.description}
//         title={showImage.description}
//         className="list-figure-img"
//       />
//     </div>
//     <div className="list-wrapper">
//       <div
//         className="list-item letter-spacing cursor-pointer color-grogu text-underline"
//         onClick={() => onEdit(figure)}
//       >
//         <h3>{figure.mainName}</h3>{" "}
//       </div>
//       <div className="list-item">
//         <h4>{figure.additionalName}</h4>{" "}
//       </div>
//       <div className="list-item">
//         {figure.number} - {figure.releaseYear}
//       </div>
//       <div className="list-item">Series : {figure.series}</div>
//       <div className="list-item">Purchase Date : {figure.purchaseDate}</div>
//     </div>
//   </div>
// );
