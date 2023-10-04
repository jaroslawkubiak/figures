import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
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
} from '../store';
import FigureEdit from './FigureEdit';

function FigureList({ listView, figures }) {
  const dispatch = useDispatch();

  const [clickedImage, setClickedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const handleChange = (figure, figIndex) => {
    setCurrentIndex(figIndex);
    setClickedImage(figure);
  };

  // go to next image
  const handleSwapRight = () => {
    const totalLength = figures.length;

    // if clicked - show the first element
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      setClickedImage(figures[0]);
      return;
    }

    const newIndex = currentIndex + 1;
    const newUrl = figures.filter(item => {
      return figures.indexOf(item) === newIndex;
    });

    setClickedImage(newUrl[0]);
    setCurrentIndex(newIndex);
  };

  // go to previous image
  const handleSwapLeft = () => {
    const totalLength = figures.length;

    // if clicked - show the first element
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      setClickedImage(figures[totalLength - 1]);
      return;
    }

    const newIndex = currentIndex - 1;
    const newUrl = figures.filter(item => {
      return figures.indexOf(item) === newIndex;
    });

    setClickedImage(newUrl[0]);
    setCurrentIndex(newIndex);
  };

  //edit figure
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
  const handleCloseEditFigureForm = () => setShowFigureEditForm(false);

  const FigureEditComponent = <FigureEdit onClose={handleCloseEditFigureForm} />;

  console.log('figi==', figures);

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
