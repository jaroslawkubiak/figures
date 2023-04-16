import { useState } from "react";
import "../css/figure-card.css";
import showFigureImage from "../js/showFigureImage";

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
  let cssClassWrapper = "r2d2-wrapper";
  let cssClassImg = "r2d2-img-wrapper cursor-pointer";
  let cssClassItem = "r2d2-item color-secondary";
  let cssClassHeader =
    "r2d2-item letter-spacing cursor-pointer text-underline color-secondary";
    let cssClassLogo = "r2d2-logo-wrapper";

  if (!isFigureEven) {
    cssClassContainer = "r2d2-container-even";
    cssClassWrapper = "r2d2-wrapper-even";
    cssClassImg = "r2d2-img-wrapper cursor-pointer r2d2-even";
    cssClassItem = "r2d2-item-even color-secondary";
    cssClassHeader =
      "r2d2-item-even letter-spacing cursor-pointer text-underline color-secondary";
      cssClassLogo = "r2d2-logo-wrapper r2d2-even";
  }

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
          <h3>{figure.mainName}</h3>
        </div>
        <div className={cssClassItem}>
          {figure.additionalName}
        </div>
        <div className={cssClassItem}>
          {figure.number} - {figure.releaseYear}
        </div>
        <div className={cssClassItem}>Series : {figure.series}</div>
        <div className={cssClassItem}>
          Price : {figure.purchasePrice} zł
        </div>
      </div>

      <div className={cssClassLogo}>
        <img
          src={bricklinkLogo.url}
          alt={showImage.description}
          title={showImage.description}
          className="r2d2-logo-img"
        />
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
