import { useState } from "react";
import Modal from "./Modal";
import FigureCard from "./FigureCard";

function FigureList({ figures, onDelete }) {
  const [clickedImage, setClickedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const handleChange = (figure, figIndex) => {
    setCurrentIndex(figIndex);
    setClickedImage(figure);
  };

  // go to next image
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

  // go to previous image
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

  const renderedFigures = figures.data.map((figure, index) => {
    return (
      <FigureCard
        onDelete={onDelete}
        key={figure.id}
        figure={figure}
        clickedImage={index}
        onClick={handleChange}
      />
    );
  });

  return (
    <>
      <div className="figure-container">{renderedFigures}</div>
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
