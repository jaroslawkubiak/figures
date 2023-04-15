import "../css/filters.css";
import {
  BsFilterSquareFill,
  BsPlusSquare,
  BsFilterSquare,
  BsListColumnsReverse,
  BsGrid,
} from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { onlyNumbersRegex, yearsList } from "../js/helpers";
import seriesList from "../data/seriesList.json";

import FigureQuantity from "./FigureQuantity";
import React, { useState } from "react";
import { LegoMinifigure } from "../svg/LegoMinifigure";
import InputText from "./InputText";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchNumber,
  changeSearchMainName,
  changeSearchReleaseYear,
  changeSearchSeries,
} from "../store";

function Filters({ onAddFigure, onHandleView, listView, quantity }) {
  const dispatch = useDispatch();

  // searching by figure number
  const searchingNumber = useSelector(state => {
    return state.figures.searchNumber;
  });
  const handleChangeSearchingNumber = e => {
    dispatch(changeSearchNumber(e.target.value));
  };
  const handleResetSearchNumber = () => {
    dispatch(changeSearchNumber(""));
  };

  // searching by figure main name
  const searchingMainName = useSelector(state => {
    return state.figures.searchMainName;
  });
  const handleChangeSearchingMainName = e => {
    dispatch(changeSearchMainName(e.target.value));
  };
  const handleResetSearchMainName = () => {
    dispatch(changeSearchMainName(""));
  };

  // searching by figure releaseYear
  const searchingReleaseYear = useSelector(state => {
    return state.figures.searchReleaseYear;
  });
  const handleChangeSearchingReleaseYear = (option, _) => {
    dispatch(changeSearchReleaseYear(option));
  };
  const handleResetSearchReleaseYear = () => {
    dispatch(changeSearchReleaseYear(""));
  };

  // searching by figure series
  const searchingSeries = useSelector(state => {
    return state.figures.searchSeries;
  });
  const handleChangeSearchingSeries = (option, _) => {
    dispatch(changeSearchSeries(option));
  };
  const handleResetSearchSeries = () => {
    dispatch(changeSearchSeries(""));
  };

  const [expandFilters, setExpandFilters] = useState(false);
  const handleExpandCollapseFilters = () => {
    setExpandFilters(!expandFilters);
  };

  const cssBackground = listView
    ? "filter-container background-color-gray"
    : "filter-container background-color-primary";

  const cssFilterBackground = listView
    ? "background-color-gray filter-container-expand"
    : "background-color-primary filter-container-expand";

  // let cssFilterBackground = "filter-container-expand";
  // if (listView) cssFilterBackground += " background-color-gray";
  // else cssFilterBackground += " background-color-primary";
  // if (expandFilters) cssFilterBackground += " filter-expand-animation";
  // else cssFilterBackground += " filter-collapse-animation";

  const fillColor = "#0e0e16";

  return (
    <>
      <div className={cssBackground}>
        <div className="self-start">
          <BsPlusSquare
            onClick={onAddFigure}
            fill={fillColor}
            className="cursor-pointer filter-icon"
            title="Add figure"
          />
        </div>

        {/* display quantity of minifigures */}
        <div
          className="filter-quantity-wprapper self-center"
          title="Figures quantity"
        >
          <LegoMinifigure width="30" cssClass="svg-fill-bg" />
          <FigureQuantity quantity={quantity} fillColor={fillColor} />
        </div>

        <div className=" self-center">
          {/* show list view */}
          {!listView && (
            <BsListColumnsReverse
              fill={fillColor}
              onClick={onHandleView}
              className="cursor-pointer filter-icon"
              title="List view"
            />
          )}
          {/* show card view */}
          {listView && (
            <BsGrid
              fill={fillColor}
              onClick={onHandleView}
              className="cursor-pointer filter-icon"
              title="Card view"
            />
          )}
        </div>

        <div className=" self-end">
          {/* collapse filters */}
          {expandFilters && (
            <BsFilterSquareFill
              fill={fillColor}
              onClick={handleExpandCollapseFilters}
              className="cursor-pointer filter-icon"
              title="Collapse filters"
            />
          )}
          {/* expand filters */}
          {!expandFilters && (
            <BsFilterSquare
              fill={fillColor}
              onClick={handleExpandCollapseFilters}
              className="cursor-pointer filter-icon"
              title="Expand filters"
            ></BsFilterSquare>
          )}
        </div>
      </div>

      {expandFilters && (
        <div className={cssFilterBackground}>
          <div className="filter-item-wrapper self-center relative">
            <div>
              <InputText
                onChange={handleChangeSearchingNumber}
                value={searchingNumber}
                name="number"
                maxLength="8"
                cssClass="add-figure-input background-color-bg color-primary"
              >
                Number
              </InputText>
            </div>
            {searchingNumber && (
              <div
                className="filter-reset-icon cursor-pointer"
                onClick={handleResetSearchNumber}
              >
                <ImCross />
              </div>
            )}
          </div>
          <div className="filter-item-wrapper self-center relative">
            <div>
              <InputText
                onChange={handleChangeSearchingMainName}
                value={searchingMainName}
                name="mainName"
                cssClass="add-figure-input background-color-bg color-primary"
              >
                Name
              </InputText>
            </div>
            {searchingMainName && (
              <div
                className="filter-reset-icon cursor-pointer"
                onClick={handleResetSearchMainName}
              >
                <ImCross />
              </div>
            )}
          </div>
          <div className="filter-item-wrapper self-center cursor-pointer relative">
            <div>
              <Dropdown
                cssClass="add-figure-input background-color-bg color-primary"
                cssPanelClass="add-figure-input select-height background-color-bg color-primary"
                cssDropdownElement="dropdown-el-primary"
                name="releaseYear"
                onChange={handleChangeSearchingReleaseYear}
                options={yearsList}
                placeholder="Select year..."
                value={searchingReleaseYear}
              >
                Release Year
              </Dropdown>
            </div>
            {searchingReleaseYear && (
              <div
                className="filter-reset-icon cursor-pointer "
                onClick={handleResetSearchReleaseYear}
              >
                <ImCross />
              </div>
            )}
          </div>
          <div className="filter-item-wrapper self-center cursor-pointer relative">
            <div>
              <Dropdown
                cssClass="add-figure-input background-color-bg color-primary"
                cssPanelClass="add-figure-input select-height background-color-bg color-primary"
                cssDropdownElement="dropdown-el-primary"
                name="series"
                onChange={handleChangeSearchingSeries}
                options={seriesList}
                placeholder="Select series..."
                value={searchingSeries}
              >
                Series
              </Dropdown>
            </div>
            {searchingSeries && (
              <div
                className="filter-reset-icon cursor-pointer "
                onClick={handleResetSearchSeries}
              >
                <ImCross />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Filters;
