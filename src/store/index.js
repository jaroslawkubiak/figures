import { configureStore } from '@reduxjs/toolkit';
import {
  figuresReducers,
  changeSearchNumber,
  changeSearchMainName,
  changeSearchReleaseYear,
  changeSearchSeries,
  addFigure,
  editFigure,
  removeFigure,
  setError,
} from './slice/figureSlice';

import {
  formReducer,
  changeNumber,
  changeMainName,
  changeReleaseYear,
  changeAdditionalName,
  changeBricklink,
  changeLabel,
  changeSeries,
  changePurchasePrice,
  changeWeapon,
  changePurchaseDate,
  changeBricklinkPrice,
  changeImageLink,
} from './slice/formSlice';

import {
  editReducer,
  editId,
  editNumber,
  editMainName,
  editReleaseYear,
  editAdditionalName,
  editBricklink,
  editLabel,
  editSeries,
  editPurchasePrice,
  editWeapon,
  editPurchaseDate,
  editBricklinkPrice,
} from './slice/editSlice';

import { notificationReducers, addNotification, removeNotification } from './slice/notificationSlice';

const store = configureStore({
  reducer: {
    figures: figuresReducers,
    form: formReducer,
    edit: editReducer,
    notification: notificationReducers,
  },
});

export * from './thunks/fetchFigures';
export * from './thunks/getFigureInfo';
export {
  store,
  addFigure,
  removeFigure,
  changeNumber,
  changeMainName,
  changeSearchNumber,
  changeSearchMainName,
  changeSearchReleaseYear,
  changeSearchSeries,
  changeReleaseYear,
  changeAdditionalName,
  changeBricklink,
  changeLabel,
  changeSeries,
  changePurchasePrice,
  changeWeapon,
  changePurchaseDate,
  changeBricklinkPrice,
  editFigure,
  editNumber,
  editId,
  editMainName,
  editReleaseYear,
  editAdditionalName,
  editBricklink,
  editLabel,
  editSeries,
  editPurchasePrice,
  editWeapon,
  editPurchaseDate,
  editBricklinkPrice,
  addNotification,
  removeNotification,
  setError,
  changeImageLink,
};
