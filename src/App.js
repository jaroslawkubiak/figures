// import figuresData from "./data/figureList.json";
import './fonts/star_wars.ttf';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FigureList from './components/FigureList';
import Filters from './components/Filters';
import FigureAdd from './components/FigureAdd';
import { fetchFigures } from './store';

import { GalacticEmpire } from './svg/GalacticEmpire';

function App() {
  const dispatch = useDispatch();

  const [listView, setListView] = useState(false);
  const [showFigureAddForm, setShowFigureAddForm] = useState(false);
  const handleListView = () => {
    setListView(!listView);
  };
  const handleAddFigureForm = () => setShowFigureAddForm(!showFigureAddForm);

  useEffect(() => {
    dispatch(fetchFigures());
  }, [dispatch]);

  // getting info about all figures or filtered figures
  const figures = useSelector(
    // ({ figures: { data, searchNumber, searchMainName, searchReleaseYear, searchSeries, isLoading, error } }) => {
    ({ figures }) => {
      // console.log('isLoading=', figures.isLoading, 'error=', figures.error);

      // if (isLoading) return data;
      // filtering logic

      // return figures;

      const filteredFigures = figures.data.filter(fig => {
        const searchReleaseYearConditions = figures.searchReleaseYear
          ? fig.releaseYear === figures.searchReleaseYear
          : fig;
        const searchSeriesConditions = figures.searchSeries ? fig.series === figures.searchSeries : fig;
        return (
          fig.number.toLowerCase().includes(figures.searchNumber.toLowerCase()) &&
          (fig.mainName.toLowerCase().includes(figures.searchMainName.toLowerCase()) ||
            fig.additionalName.toLowerCase().includes(figures.searchMainName.toLowerCase())) &&
          searchReleaseYearConditions &&
          searchSeriesConditions
        );
      });

      return { data: filteredFigures, isLoading: figures.isLoading, error: figures.error };

      // return figures.data.filter(fig => {
      //   const searchReleaseYearConditions = figures.searchReleaseYear ? fig.releaseYear === figures.searchReleaseYear : fig;
      //   const searchSeriesConditions = figures.searchSeries ? fig.series === figures.searchSeries : fig;
      //   return (
      //     fig.number.toLowerCase().includes(figures.searchNumber.toLowerCase()) &&
      //     (fig.mainName.toLowerCase().includes(figures.searchMainName.toLowerCase()) ||
      //       fig.additionalName.toLowerCase().includes(figures.searchMainName.toLowerCase())) &&
      //     searchReleaseYearConditions &&
      //     searchSeriesConditions
      //   );
      // });
    }
  );

  const quantity = figures.data.length;
  console.log('figs=', figures);

  return (
    <div className="app-container">
      {/* <div className="test"></div> */}
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
