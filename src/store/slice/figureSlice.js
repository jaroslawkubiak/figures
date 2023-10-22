import { createSlice } from '@reduxjs/toolkit';
import { fetchFigures } from '../thunks/fetchFigures';

const figuresSlice = createSlice({
  name: 'figures',
  initialState: {
    searchNumber: '',
    searchMainName: '',
    searchReleaseYear: '',
    searchSeries: '',
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchFigures.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFigures.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchFigures.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {
    // action creators
    changeSearchNumber(state, action) {
      state.searchNumber = action.payload;
    },
    changeSearchMainName(state, action) {
      state.searchMainName = action.payload;
    },
    changeSearchReleaseYear(state, action) {
      state.searchReleaseYear = action.payload;
    },
    changeSearchSeries(state, action) {
      state.searchSeries = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addFigure(state, action) {
      state.data.unshift({
        id: action.payload.id,
        number: action.payload.number,
        mainName: action.payload.mainName,
        additionalName: action.payload.additionalName,
        releaseYear: action.payload.releaseYear,
        series: action.payload.series,
        seriesID: action.payload.seriesID,
        purchasePrice: action.payload.purchasePrice,
        bricklink: action.payload.bricklink,
        imageLink: `https://img.bricklink.com/ItemImage/MN/0/${action.payload.number}.png`,
        label: action.payload.label,
        bricklinkPrice: action.payload.bricklinkPrice,
        purchaseDate: action.payload.purchaseDate,
        weapon: action.payload.weapon,
      });
    },
    editFigure(state, action) {
      const updated = state.data.map(fig => {
        if (fig.id === action.payload.id) {
          fig.number = action.payload.number;
          fig.mainName = action.payload.mainName;
          fig.additionalName = action.payload.additionalName;
          fig.releaseYear = action.payload.releaseYear;
          fig.series = action.payload.series;
          fig.purchasePrice = action.payload.purchasePrice;
          fig.bricklink = action.payload.bricklink;
          fig.label = action.payload.label;
          fig.bricklinkPrice = action.payload.bricklinkPrice;
          fig.purchaseDate = action.payload.purchaseDate;
          fig.weapon = action.payload.weapon;
        }
        return fig;
      });
      state.data = updated;
    },
    removeFigure(state, action) {
      const updated = state.data.filter(fig => {
        return fig.id !== action.payload;
      });
      state.data = updated;
    },
  },
});

export const {
  changeSearchNumber,
  changeSearchMainName,
  changeSearchReleaseYear,
  changeSearchSeries,
  addFigure,
  removeFigure,
  editFigure,
  setError,
} = figuresSlice.actions;
export const figuresReducers = figuresSlice.reducer;
