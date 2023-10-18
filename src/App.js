import './fonts/star_wars.ttf';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FigureList from './components/FigureList';
import Filters from './components/Filters';
import FigureAdd from './components/FigureAdd';
import Notification from './components/Notification';

import { fetchFigures } from './store';
import seriesListDB from './utils/getSeriesList';

function App() {
  const dispatch = useDispatch();
  const [listView, setListView] = useState(false);
  const [seriesList, setSeriesList] = useState();
  const [showFigureAddForm, setShowFigureAddForm] = useState(false);
  const handleListView = () => {
    setListView(!listView);
  };
  const handleAddFigureForm = () => setShowFigureAddForm(!showFigureAddForm);

  useEffect(() => {
    seriesListDB()
      .then(value => {
        setSeriesList(value);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(fetchFigures());
  }, [dispatch]);

  // getting info about all figures or filtered figures
  const figures = useSelector(({ figures }) => {
    if (figures) {
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

  // const notAdd = {
  //   message: 'figure added',
  //   type: 'add',
  // };
  // const notEdit = {
  //   message: 'figure updated',
  //   type: 'edit',
  // };
  // const notDelete = {
  //   message: 'figure removed',
  //   type: 'delete',
  // };
  // const notError = {
  //   message: 'faild to delete',
  //   type: 'error',
  // };

  return (
    <div className="app-container">
      {/* {notAdd && <Notification>{notAdd}</Notification>}
      {notEdit && <Notification>{notEdit}</Notification>}
      {notDelete && <Notification>{notDelete}</Notification>}
      {notError && <Notification>{notError}</Notification>} */}

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
      <FigureList listView={listView} figures={figures.data} />
    </div>
  );
}

export default App;
