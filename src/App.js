import figuresData from "./data/figureList.json";
import "./fonts/star_wars.ttf";
import { useState } from "react";
import FigureList from "./components/FigureList";
import Filters from "./components/Filters";
import FigureAdd from "./components/FigureAdd";
import FigureEdit from "./components/FigureEdit";

function App() {
  const [figures, setFigures] = useState(figuresData);
  const [listView, setListView] = useState(false);

  const [showFigureAddForm, setShowFigureAddForm] = useState(false);
  const [showFigureEditForm, setShowFigureEditForm] = useState(false);

  const [figureToEdit, setFigureToEdit] = useState(null);

  const handleListView = () => {
    setListView(!listView);
  };

  // deleting figure from DB
  const deleteFigureById = id => {
    const updatedFigures = figures.filter(figure => {
      return figure.id !== id;
    });

    setFigures(updatedFigures);
  };

  const handleFigureEdit = fig => {
    setShowFigureEditForm(true);
    setFigureToEdit(fig);
  };

  const handleAddFigure = figure => {
    const updatedFigures = [figure, ...figures];
    setFigures(updatedFigures);
  };

  const handleEditFigure = () => {
    console.log("zapisuję figurkę po edycji:");
  };

  const handleAddFigureForm = () => setShowFigureAddForm(!showFigureAddForm);

  const handleCloseEditFigureForm = () => setShowFigureEditForm(false);

  const FigureAddComponent = (
    <FigureAdd onSubmit={handleAddFigure} onClose={handleAddFigureForm} />
  );

  const FigureEditComponent = (
    <FigureEdit
      onSubmit={handleEditFigure}
      figure={figureToEdit}
      onClose={handleCloseEditFigureForm}
    />
  );

  return (
    <>
      <Filters
        onHandleView={handleListView}
        listView={listView}
        figures={figures}
        onAddFigure={handleAddFigureForm}
      />

      {/* <Button onClick={handleShowAddFigureForm}>add figure</Button> */}
      {showFigureAddForm && FigureAddComponent}
      {showFigureEditForm && FigureEditComponent}
      <FigureList
        onDelete={deleteFigureById}
        onEdit={handleFigureEdit}
        listView={listView}
        figures={figures}
      />
    </>
  );
}

export default App;

//"homepage": "https://zurawickidesign.pl/figures/",
