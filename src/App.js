import figuresData from "./data/figureList.json";
import "./fonts/star_wars.ttf";
import { useState } from "react";
import FigureList from "./components/FigureList";
import Filters from "./components/Filters";
import FigureAdd from "./components/FigureAdd";
import FigureEdit from "./components/FigureEdit";
import Button from "./components/Button";

function App() {
  const [figures, setFigures] = useState(figuresData);
  const [showFigureAdd, setShowFigureAddForm] = useState(false);

  const [showFigureEditForm, setShowFigureEditForm] = useState(false);
  const [figureToEdit, setFigureToEdit] = useState(null);

  // deleting figure from DB
  const deleteFigureById = id => {
    const updatedFigures = figures.filter(figure => {
      return figure.id !== id;
    });

    setFigures(updatedFigures);
  };

  const handleFigureEdit = fig => {
    console.log("start edit:", fig);
    setShowFigureEditForm(true);
    setFigureToEdit(fig.id);
  };

  const handleAddFigure = figure => {
    const updatedFigures = [figure, ...figures];
    setFigures(updatedFigures);
  };

  const handleEditFigure = () => {
    console.log("edytuję figurkę");
  };
  const handleShowAddFigureForm = () => setShowFigureAddForm(true);
  const handleCloseAddFigureForm = () => setShowFigureAddForm(false);

  const handleCloseEditFigureForm = () => setShowFigureEditForm(false);

  const FigureAddComponent = (
    <FigureAdd onSubmit={handleAddFigure} onClose={handleCloseAddFigureForm} />
  );

  const FigureEditComponent = (
    <FigureEdit
      onSubmit={handleEditFigure}
      onClose={handleCloseEditFigureForm}
    />
  );

  return (
    <>
      {/* <Filters /> */}
      <Button onClick={handleShowAddFigureForm}>add figure</Button>
      {showFigureAdd && FigureAddComponent}
      {showFigureEditForm && FigureEditComponent}
      Ilość figurek : {figures.length}
      <FigureList
        onDelete={deleteFigureById}
        onEdit={handleFigureEdit}
        figures={figures}
      />
    </>
  );
}

export default App;

//"homepage": "https://zurawickidesign.pl/figures/",
