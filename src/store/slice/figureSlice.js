import { createSlice, nanoid } from "@reduxjs/toolkit";
import figuresData from "../../data/figureList.json";

const figuresSlice = createSlice({
  name: "figures",
  initialState: {
    searchNumber: "",
    searchMainName: "",
    searchReleaseYear: "",
    searchSeries: "",
    data: figuresData,
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
    addFigure(state, action) {
      state.data.unshift({
        id: nanoid(),
        number: action.payload.number,
        mainName: action.payload.mainName,
        additionalName: action.payload.additionalName,
        releaseYear: action.payload.releaseYear,
        series: action.payload.series,
        purchasePrice: action.payload.purchasePrice,
        bricklink: action.payload.bricklink,
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
} = figuresSlice.actions;
export const figuresReducers = figuresSlice.reducer;
