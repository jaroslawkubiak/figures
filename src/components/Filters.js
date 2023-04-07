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
import { LegoMinifigure} from '../svg/LegoMinifigure';

function Filters({ figures, onAddFigure, onHandleView, listView }) {
  const [expandFilters, setExpandFilters] = useState(false);

  const handleExpandCollapseFilters = () => {
    setExpandFilters(!expandFilters);
  };

  const cssBackground = listView ? "filter-container background-color-gray" : "filter-container background-color-primary";
  return (
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
  );
}

export default Filters;
