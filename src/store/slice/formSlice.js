import { createSlice } from '@reduxjs/toolkit';
import { addFigure } from './figureSlice';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    id: '',
    number: '',
    mainName: '',
    additionalName: '',
    releaseYear: '',
    label: '',
    bricklink: '',
    imageLink: 'https://jaroslawkubiak.pl/portfolio/figures/static/media/bricklink.png',
    series: '',
    seriesID: '',
    purchasePrice: '',
    weapon: '',
    purchaseDate: '',
    bricklinkPrice: '',
  },
  reducers: {
    changeNumber(state, action) {
      state.number = action.payload;
    },
    changeMainName(state, action) {
      state.mainName = action.payload;
    },
    changeAdditionalName(state, action) {
      state.additionalName = action.payload;
    },
    changeBricklink(state, action) {
      state.bricklink = action.payload;
    },
    changeImageLink(state, action) {
      state.imageLink = action.payload;
    },
    changeLabel(state, action) {
      state.label = action.payload ? 'on' : '';
    },
    changeReleaseYear(state, action) {
      state.releaseYear = action.payload;
    },
    changeSeries(state, action) {
      state.series = action.payload;
    },
    changePurchasePrice(state, action) {
      state.purchasePrice = action.payload;
    },
    changeWeapon(state, action) {
      state.weapon = action.payload;
    },
    changePurchaseDate(state, action) {
      state.purchaseDate = action.payload;
    },
    changeBricklinkPrice(state, action) {
      state.bricklinkPrice = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addFigure, (state, action) => {
      state.id = '';
      state.number = '';
      state.mainName = '';
      state.additionalName = '';
      state.releaseYear = '';
      state.bricklink = '';
      state.imageLink = '';
      state.label = '';
      state.series = '';
      state.seriesID = '';
      state.purchasePrice = '';
      state.bricklinkPrice = '';
      state.purchaseDate = '';
      state.weapon = '';
    });
  },
});

export const {
  changeNumber,
  changeMainName,
  changeAdditionalName,
  changeReleaseYear,
  changeBricklink,
  changeLabel,
  changeSeries,
  changePurchasePrice,
  changeWeapon,
  changePurchaseDate,
  changeBricklinkPrice,
  changeImageLink,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
