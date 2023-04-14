import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import FigureShowCard from "./FigureShowCard";
import FigureShowList from "./FigureShowList";
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
} from "../store";
import FigureEdit from "./FigureEdit";

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
  const handleCloseEditFigureForm = () => setShowFigureEditForm(false);

  const FigureEditComponent = (
    <FigureEdit onClose={handleCloseEditFigureForm} />
  );

  const renderedFigures = figures.map((figure, index) => {
    if (listView) {
      return (
        <FigureShowList
          onEdit={() => handleEdit(figure)}
          key={figure.id}
          figure={figure}
          clickedImage={index}
          onModal={handleChange}
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

  return (
    <>
      <div
        className={
          listView
            ? "figure-container-list background-color-gray"
            : "figure-container-card background-color-bg"
        }
      >
        {showFigureEditForm && FigureEditComponent}

        {renderedFigures}
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
