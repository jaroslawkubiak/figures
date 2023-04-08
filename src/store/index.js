import { configureStore } from "@reduxjs/toolkit";
import {
  figuresReducers,
  changeSearchTerm,
  addFigure,
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

const store = configureStore({
  reducer: {
    figures: figuresReducers,
    form: formReducer,
  },
});

export {
  store,
  addFigure,
  removeFigure,
  changeNumber,
  changeMainName,
  changeSearchTerm,
  changeReleaseYear,
  changeAdditionalName,
  changeBricklink,
  changeLabel,
  changeSeries,
  changePurchasePrice,
  changeWeapon,
  changePurchaseDate,
  changeBricklinkPrice,
};
