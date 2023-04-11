import "../css/filters.css";
import {
  BsFilterSquareFill,
  BsPlusSquare,
  BsFilterSquare,
  BsListColumnsReverse,
  BsGrid
} from "react-icons/bs";

import FigureQuantity from "./FigureQuantity";
import React, { useState } from "react";
import { LegoMinifigure } from "../svg/LegoMinifigure";
import AnimateHeight from "react-animate-height";
import InputText from "./InputText";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from "../store";

function Filters({
  setFigures,
  onAddFigure,
  onHandleView,
  listView,
  figuresData,
}) {
  // const dispatch = useDispatch();

  // const searchTerm = useSelector(state => {
  //   return state.cars.searchTerm;
  // });

  // const handleSearchTermChange = event => {
  //   dispatch(changeSearchTerm(event.target.value));
  // };

  const [expandFilters, setExpandFilters] = useState(false);
  const [height, setHeight] = useState(150);

  const figures = useSelector(state => {
    return state.figures.data;
  });

  // console.log(figures);
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
          <BsGrid
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

      {expandFilters && (
        <AnimateHeight duration={800} height={height}>
          <div className="filter-container-expand">
            <div className="filter-item-wrapper">
              <InputText
                // onChange={handleChangeSearchingNumber}
                // onFocus={handleOnFocus}
                // value={searchingNumber}

                // value={searchTerm}
                // onChange={handleSearchTermChange}
                name="number"
                maxLength="8"
                cssClass="add-figure-input background-color-bg color-primary"
              >
                Number
              </InputText>
            </div>
          </div>
        </AnimateHeight>
      )}
    </>
  );
}

export default Filters;
