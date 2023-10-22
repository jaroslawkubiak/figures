import './fonts/star_wars.ttf';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FigureAdd from './components/pages/FigureAdd';
import FigureList from './components/pages/FigureList';
import Filters from './components/pages/Filters';
import Notification from './components/assets/Notification';

import { fetchFigures, setError } from './store';
import getSeriesList from './utils/getSeriesList';

function App() {
  const dispatch = useDispatch();
  const [listView, setListView] = useState(false);
  const [seriesList, setSeriesList] = useState();
  const [showFigureAddForm, setShowFigureAddForm] = useState(false);
  const handleListView = () => {
    setListView(!listView);
  };
  const handleAddFigureForm = () => setShowFigureAddForm(!showFigureAddForm);

  // fetching for series list from DB
  useEffect(() => {
    getSeriesList()
      .then(value => {
        setSeriesList(value);
      })
      .catch(err => {
        dispatch(setError(err));
      });
  }, []);

  useEffect(() => {
    dispatch(fetchFigures());
  }, [dispatch]);

  // getting info about all figures or filtered figures
  const figures = useSelector(({ figures }) => {
    if (figures.data) {
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
    }
  });
  const quantity = figures.data.length;

  // creating notification state
  const notification = useSelector(({ notification }) => {
    return notification;
  });

  return (
    <div className="app-container">
      {notification && <Notification>{notification}</Notification>}
      {/* <div className="test"></div> */}
      <Filters
        onHandleView={handleListView}
        listView={listView}
        onAddFigure={handleAddFigureForm}
        quantity={quantity}
        seriesList={seriesList}
      />
      {showFigureAddForm && <FigureAdd onClose={handleAddFigureForm} seriesList={seriesList} />}
      <FigureList listView={listView} figures={figures} />
    </div>
  );
}

export default App;
