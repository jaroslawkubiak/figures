import { configureStore } from "@reduxjs/toolkit";
import {
  figuresReducers,
  changeSearchNumber,
  changeSearchMainName,
  changeSearchReleaseYear,
  changeSearchSeries,
  addFigure,
  editFigure,
  removeFigure,
} from "./slice/figureSlice";

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
} from "./slice/formSlice";

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
} from "./slice/editSlice";

const store = configureStore({
  reducer: {
    figures: figuresReducers,
    form: formReducer,
    edit: editReducer,
  },
});

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
};
