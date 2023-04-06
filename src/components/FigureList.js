import { useState } from "react";
import Modal from "./Modal";
import FigureShowCard from "./FigureShowCard";
import FigureShowList from "./FigureShowList";

function FigureList({ figures, onDelete, onEdit, listView }) {
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

  const renderedFigures = figures.map((figure, index) => {
    if (!listView)
      return (
        <FigureShowCard
          onDelete={onDelete}
          onEdit={onEdit}
          key={figure.id}
          figure={figure}
          clickedImage={index}
          onClick={handleChange}
        />
      );
    else {
      return (
        <FigureShowList
          onDelete={onDelete}
          onEdit={onEdit}
          key={figure.id}
          figure={figure}
          clickedImage={index}
          onClick={handleChange}
        />
      );
    }
  });

  return (
    <>
      <div
        className={listView ? "figure-container-list" : "figure-container-card"}
      >
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
