// import figuresData from "./data/figureList.json";
import "./fonts/star_wars.ttf";
import { useState } from "react";
import FigureList from "./components/FigureList";
import Filters from "./components/Filters";
import FigureAdd from "./components/FigureAdd";

function App() {
  const [listView, setListView] = useState(false);
  const [showFigureAddForm, setShowFigureAddForm] = useState(false);
  const handleListView = () => {
    setListView(!listView);
  };
  const handleAddFigureForm = () => setShowFigureAddForm(!showFigureAddForm);

  return (
    <>
      <Filters
        onHandleView={handleListView}
        listView={listView}
        onAddFigure={handleAddFigureForm}
      />
      {showFigureAddForm && <FigureAdd onClose={handleAddFigureForm} />}
      <FigureList
        listView={listView}
      />
    </>
  );
}

export default App;
