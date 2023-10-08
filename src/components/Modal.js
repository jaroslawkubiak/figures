import '../css/modal.css';
import showFigureImage from '../utils/showFigureImage';
import { ImArrowRight2, ImArrowLeft2, ImCross } from 'react-icons/im';
import { useEffect } from 'react';

const Modal = ({ clickedImage, handleSwapRight, handleSwapLeft, setClickedImage }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const showImage = showFigureImage(clickedImage);

  const handleClick = e => {
    if (e.target.classList.contains('dismiss')) {
      setClickedImage(null);
    }
  };

  return (
    <div className="modal-wrapper dismiss" onClick={handleClick}>
      <div className="modal-container">
        <div className="modal-next-image cursor-pointer" onClick={handleSwapRight}></div>
        <ImArrowLeft2 onClick={handleSwapLeft} className="modal-arrow-left modal-arrow cursor-pointer" />

        <div className="modal-prev-image cursor-pointer" onClick={handleSwapLeft}></div>
        <ImArrowRight2 onClick={handleSwapRight} className="modal-arrow-right modal-arrow cursor-pointer" />

        <div className="modal-close-btn" onClick={handleClick}>
          <ImCross className={`svg-fill-bg modal-close-svg`} />
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
