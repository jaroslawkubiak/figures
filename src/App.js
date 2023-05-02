// import figuresData from "./data/figureList.json";
import "./fonts/star_wars.ttf";
import { useState } from "react";
import { useSelector } from "react-redux";

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

  // getting info about all figures or filtered figures
  const figures = useSelector(
    ({
      figures: {
        data,
        searchNumber,
        searchMainName,
        searchReleaseYear,
        searchSeries,
      },
    }) => {
      // filtering logic
      return data.filter(fig => {
        const searchReleaseYearConditions = searchReleaseYear
          ? fig.releaseYear === searchReleaseYear
          : fig;

        const searchSeriesConditions = searchSeries
          ? fig.series === searchSeries
          : fig;

        return (
          fig.number.toLowerCase().includes(searchNumber.toLowerCase()) &&
          (fig.mainName.toLowerCase().includes(searchMainName.toLowerCase()) ||
            fig.additionalName
              .toLowerCase()
              .includes(searchMainName.toLowerCase())) &&
          searchReleaseYearConditions &&
          searchSeriesConditions
        );
      });
    }
  );
  const quantity = figures.length;

  return (
    <div className="app-container">
      <div className="test"></div>
      <Filters
        onHandleView={handleListView}
        listView={listView}
        onAddFigure={handleAddFigureForm}
        quantity={quantity}
      />
      {showFigureAddForm && <FigureAdd onClose={handleAddFigureForm} />}
      <FigureList listView={listView} figures={figures} />
    </div>
  );
}

export default App;
