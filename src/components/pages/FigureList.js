import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../assets/Modal';
import { ImArrowUp2 } from 'react-icons/im';
import FigureShowCard from './FigureShowCard';
import FigureShowList from './FigureShowList';
import {
  editNumber,
  editId,
  editMainName,
  editReleaseYear,
  editAdditionalName,
  editLabel,
  editBricklink,
  editSeries,
  editPurchasePrice,
  editWeapon,
  editPurchaseDate,
  editBricklinkPrice,
} from '../../store';
import FigureEdit from './FigureEdit';
import { GalacticEmpire } from '../../svg/GalacticEmpire';

function FigureList({ listView, figures }) {
  const dispatch = useDispatch();
  const [clickedImage, setClickedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleChange = (figure, figIndex) => {
    setCurrentIndex(figIndex);
    setClickedImage(figure);
  };

  // go to next image handler function
  const handleSwapRight = () => {
    const totalLength = figures.data.length;
    // if clicked - show the first element
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      setClickedImage(figures.data[0]);
      return;
    }

    const newIndex = currentIndex + 1;
    const newUrl = figures.data.filter(item => {
      return figures.data.indexOf(item) === newIndex;
    });

    setClickedImage(newUrl[0]);
    setCurrentIndex(newIndex);
  };

  // go to previous image handler function
  const handleSwapLeft = () => {
    const totalLength = figures.data.length;

    // if clicked - show the first element
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      setClickedImage(figures.data[totalLength - 1]);
      return;
    }

    const newIndex = currentIndex - 1;
    const newUrl = figures.data.filter(item => {
      return figures.data.indexOf(item) === newIndex;
    });

    setClickedImage(newUrl[0]);
    setCurrentIndex(newIndex);
  };

  // edit figure
  const handleEdit = fig => {
    setShowFigureEditForm(true);
    dispatch(editId(fig.id));
    dispatch(editNumber(fig.number));
    dispatch(editMainName(fig.mainName));
    dispatch(editReleaseYear(fig.releaseYear));
    dispatch(editAdditionalName(fig.additionalName));
    dispatch(editLabel(fig.label));
    dispatch(editBricklink(fig.bricklink));
    dispatch(editSeries(fig.series));
    dispatch(editPurchasePrice(fig.purchasePrice));
    dispatch(editWeapon(fig.weapon));
    dispatch(editPurchaseDate(fig.purchaseDate));
    dispatch(editBricklinkPrice(fig.bricklinkPrice));
  };

  const [showFigureEditForm, setShowFigureEditForm] = useState(false);
  const [positionFromTop, setPositionFromTop] = useState(0);
  const FigureEditComponent = <FigureEdit onClose={() => setShowFigureEditForm(false)} />;

  // loading figure list from API
  const renderedIsLoading = figures.isLoading ? (
    <div className="isLoading-wrapper">
      <div className="isLoading-content">
        <GalacticEmpire cssClass="svg-fill-primary svg-rotate" />
      </div>
      <span className="color-primary isLoading-error">Loading...</span>
    </div>
  ) : (
    ''
  );

  // error during loading figures from API
  let errorDescription;
  if (figures.error) {
    if (figures.error.message === 'AxiosError: Network Error') errorDescription = 'Try add site to trusted site';
    else errorDescription = figures.error.message;
  }

  const renderedError = figures.error ? (
    <div className="isLoading-wrapper">
      <div className="isLoading-content">
        <GalacticEmpire cssClass="svg-fill-error" />
      </div>
      <span className="color-primary isLoading-error">Error during loading!</span>
      <span className="color-error isLoading-error">{errorDescription}</span>
      <span className="color-primary isLoading-error">Please try again later.</span>
    </div>
  ) : (
    ''
  );

  const renderedFigures = figures.data.map((figure, index) => {
    if (listView) {
      let isFigureEven = index % 2;
      return (
        <FigureShowList
          onEdit={() => handleEdit(figure)}
          key={figure.id}
          figure={figure}
          clickedImage={index}
          onModal={handleChange}
          isFigureEven={isFigureEven}
        />
      );
    } else {
      return (
        <FigureShowCard
          onEdit={() => handleEdit(figure)}
          key={figure.id}
          figure={figure}
          clickedImage={index}
          onModal={handleChange}
        />
      );
    }
  });

  // after click go to top of page
  const handleGoUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  function update() {
    let rect = document.getElementById('figContainer').getBoundingClientRect();
    setPositionFromTop(rect.y);
  }
  document.addEventListener('scroll', update);

  return (
    <>
      {renderedIsLoading}
      {renderedError}
      <div
        id="figContainer"
        className={
          listView ? 'figure-container-list background-color-bg-light' : 'figure-container-card background-color-bg'
        }
      >
        {showFigureEditForm && FigureEditComponent}
        {renderedFigures}

        {positionFromTop < -1500 && (
          <ImArrowUp2
            onClick={handleGoUp}
            className={
              listView
                ? 'arrow-up cursor-pointer background-color-r2d2-secondary'
                : 'arrow-up cursor-pointer background-color-primary'
            }
          />
        )}
      </div>
      {clickedImage && (
        <Modal
          clickedImage={clickedImage}
          handleSwapRight={handleSwapRight}
          handleSwapLeft={handleSwapLeft}
          setClickedImage={setClickedImage}
        />
      )}
    </>
  );
}

export default FigureList;
