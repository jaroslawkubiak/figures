import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
  name: 'edit',
  initialState: {},
  reducers: {
    editId(state, action) {
      state.id = action.payload;
    },
    editNumber(state, action) {
      state.number = action.payload;
    },
    editMainName(state, action) {
      state.mainName = action.payload;
    },
    editAdditionalName(state, action) {
      state.additionalName = action.payload;
    },
    editBricklink(state, action) {
      state.bricklink = action.payload;
    },
    editLabel(state, action) {
      state.label = action.payload ? 'on' : '';
    },
    editReleaseYear(state, action) {
      state.releaseYear = action.payload;
    },
    editSeries(state, action) {
      state.series = action.payload;
    },
    editPurchasePrice(state, action) {
      state.purchasePrice = action.payload;
    },
    editWeapon(state, action) {
      state.weapon = action.payload;
    },
    editPurchaseDate(state, action) {
      state.purchaseDate = action.payload;
    },
    editBricklinkPrice(state, action) {
      state.bricklinkPrice = action.payload;
    },
  },
});

export const {
  editNumber,
  editMainName,
  editId,
  editAdditionalName,
  editReleaseYear,
  editBricklink,
  editLabel,
  editSeries,
  editPurchasePrice,
  editWeapon,
  editPurchaseDate,
  editBricklinkPrice,
} = editSlice.actions;
export const editReducer = editSlice.reducer;
