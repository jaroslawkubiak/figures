import "../css/filters.css";
import {
  BsFilterSquareFill,
  BsPlusSquare,
  BsFilterSquare,
  BsViewStacked,
  BsListColumnsReverse,
} from "react-icons/bs";
import FigureQuantity from "./FigureQuantity";
import React, { useState } from "react";
import { LegoMinifigure } from "../svg/LegoMinifigure";
import AnimateHeight from "react-animate-height";
import InputText from "./InputText";

function Filters({ figures, setFigures, onAddFigure, onHandleView, listView, figuresData }) {

  const [expandFilters, setExpandFilters] = useState(true);
  const [height, setHeight] = useState(150);
  const [searchingNumber, setSearchingNumber] = useState("");
  console.log("searchingNumber: ", searchingNumber);

  const handleChangeNumber = e => {
    setSearchingNumber(e.target.value);
    // setFigures(figuresData);
    const filteredFigures = figures.filter(fig => {
      // console.log("fig.number=", fig.number);
      return fig.number.includes(searchingNumber);
    });
    setFigures(filteredFigures);
  };


  const handleExpandCollapseFilters = () => {
    setHeight(height === 0 ? "auto" : 0);
    setExpandFilters(!expandFilters);
  };

  const cssBackground = listView
    ? "filter-container background-color-gray"
    : "filter-container background-color-primary";
  return (
    <>
      <div className={cssBackground}>
        <BsPlusSquare
          onClick={onAddFigure}
          className="cursor-pointer filter-icon"
          title="Add figure"
        />

        <div className="filter-quantity-wprapper" title="Figures quantity">
          <LegoMinifigure width="30" cssClass="svg-fill-bg" />
          <FigureQuantity quantity={figures.length} />
        </div>

        {!listView && (
          <BsListColumnsReverse
            onClick={onHandleView}
            className="cursor-pointer filter-icon"
            title="List view"
          />
        )}

        {listView && (
          <BsViewStacked
            onClick={onHandleView}
            className="cursor-pointer filter-icon"
            title="Card view"
          />
        )}

        {expandFilters && (
          <BsFilterSquareFill
            onClick={handleExpandCollapseFilters}
            className="cursor-pointer filter-icon"
            title="Collapse filters"
          />
        )}

        {!expandFilters && (
          <BsFilterSquare
            onClick={handleExpandCollapseFilters}
            className="cursor-pointer filter-icon"
          ></BsFilterSquare>
        )}
      </div>

      <AnimateHeight duration={800} height={height}>
        <div className="filter-container-expand">
          <div className="filter-item-wrapper">
            <InputText
              onChange={handleChangeNumber}
              // onFocus={handleOnFocus}
              value={searchingNumber}
              name="number"
              maxLength="8"
              cssClass="add-figure-input background-color-bg color-primary"
            >
              Number
            </InputText>
          </div>
        </div>
      </AnimateHeight>
    </>
  );
}

export default Filters;
