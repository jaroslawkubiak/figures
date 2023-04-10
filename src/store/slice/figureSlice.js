import { createSlice, nanoid } from "@reduxjs/toolkit";
import figuresData from "../../data/figureList.json";

const figuresSlice = createSlice({
  name: "figures",
  initialState: {
    searchTerm: "",
    data: figuresData,
  },
  reducers: {
    // action creators
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
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
    removeFigure(state, action) {
      const updated = state.data.filter(fig => {
        return fig.id !== action.payload;
      });
      state.data = updated;
    },
  },
});

export const { changeSearchTerm, addFigure, removeFigure } =
  figuresSlice.actions;
export const figuresReducers = figuresSlice.reducer;
