import "../css/modal.css";
import showFigureImage from "../js/showFigureImage";
import { ImArrowRight2, ImArrowLeft2, ImCross } from "react-icons/im";

const Modal = ({
  clickedImage,
  handleSwapRight,
  handleSwapLeft,
  setClickedImage,
}) => {
  const showImage = showFigureImage(clickedImage);

  const handleClick = e => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImage(null);
    }
  };

  return (
    <div className="modal-wrapper dismiss" onClick={handleClick}>
      <ImArrowLeft2
        onClick={handleSwapLeft}
        className="modal-arrow-left modal-arrow cursor-pointer"
      />
      <ImArrowRight2
        onClick={handleSwapRight}
        className="modal-arrow-right modal-arrow cursor-pointer"
      />
      <div className="modal-container">
        <div
          className="modal-next-image cursor-pointer"
          onClick={handleSwapRight}
        >
          &nbsp;
        </div>
        <div
          className="modal-prev-image cursor-pointer"
          onClick={handleSwapLeft}
        >
          &nbsp;
        </div>
        <div className="modal-close-btn" onClick={handleClick}>
          <ImCross className="svg-fill-bg" />
          <div className="modal-close dismiss"></div>
        </div>
        <div className="modal-label">{showImage.description}</div>
        <img
          src={showImage.url}
          alt={showImage.description}
          title={showImage.description}
          className="modal-figure-img"
        />
      </div>
    </div>
  );
};

export default Modal;
