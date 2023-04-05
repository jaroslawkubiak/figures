import figuresData from "./data/figureList.json";
import "./fonts/star_wars.ttf";
import { useState } from "react";
import FigureList from "./components/FigureList";
// import Filters from "./components/Filters";
import FigureAdd from "./components/FigureAdd";
import Button from "./components/Button";

function App() {
  const [figures, setFigures] = useState(figuresData);
  const [showFigureAdd, setShowFigureAdd] = useState(false);

  const deleteFigureById = id => {
    const updatedFigures = figures.filter(figure => {
      return figure.id !== id;
    });

    setFigures(updatedFigures);
  };

  const handleAddFigure = figure => {
    const updatedFigures = [figure, ...figures];
    setFigures(updatedFigures);
    console.log(updatedFigures);
  };

  const handleClick = () => setShowFigureAdd(true);
  const handleClose = () => setShowFigureAdd(false);

  const FigureAddComponent = (
    <FigureAdd onSubmit={handleAddFigure} onClose={handleClose} />
  );

  return (
    <>
      {/* <Filters /> */}
      <Button onClick={handleClick}>add figure</Button>
      {showFigureAdd && FigureAddComponent}
      Ilość figurek : {figures.data.length}
      <FigureList onDelete={deleteFigureById} figures={figures} />
    </>
  );
}

export default App;

//"homepage": "https://zurawickidesign.pl/figures/",
