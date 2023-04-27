import "../css/filters.css";
import {
  BsFilterSquareFill,
  BsPlusSquare,
  BsFilterSquare,
  BsListColumnsReverse,
  BsGrid,
} from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { onlyNumbersRegex } from "../utils/validate";
import { yearsList } from "../utils/yearList";

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
    if (onlyNumbersRegex.test(e.target.value))
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

  const w = window.innerWidth;
  const cssImCross = w < 814 ? "font-size-1" : "font-size-2-4";

  // class list for list view
  let cssFilterBackground =
    "background-color-r2d2-head filter-container-expand";
  let cssSvgFillColor = "#274294";
  let cssLegoIconFill = "svg-fill-r2d2-primary";
  let cssQuantityWrapper =
    "filter-quantity-wprapper justify-self-center filter-quantity-wprapper-border-list";
  let cssInputText =
    "add-figure-input background-color-r2d2-primary color-r2d2-head";
  let cssClassLabel = "add-figure-input-label color-r2d2-primary";

  let cssDropdown =
    "add-figure-input background-color-r2d2-primary color-r2d2-head";
  let cssPanelClass =
    "add-figure-input select-height background-color-bg color-r2d2-head ";
  let cssDropdownElement = "dropdown-el-primary";

  // class list for card view
  if (!listView) {
    cssFilterBackground = "background-color-primary filter-container-expand";
    cssSvgFillColor = "#212529";
    cssLegoIconFill = "svg-fill-lego-quantity";
    cssQuantityWrapper =
      "filter-quantity-wprapper justify-self-center filter-quantity-wprapper-border-card";
    cssInputText = "add-figure-input background-color-bg color-primary";
    cssClassLabel = "add-figure-input-label";
    cssDropdown = "add-figure-input background-color-bg color-primary";
    cssPanelClass =
      "add-figure-input select-height background-color-bg color-primary";
    cssDropdownElement = "dropdown-el-primary";
  }

  return (
    <>
      <div
        className={`filter-container ${
          listView || "background-color-primary"
        } ${!listView || "background-color-r2d2-head"}`}
      >
        <div className="justify-self-start">
          <BsPlusSquare
            onClick={onAddFigure}
            fill={cssSvgFillColor}
            className="cursor-pointer filter-icon"
            title="Add figure"
          />
        </div>
        {/* display quantity of minifigures */}
        <div className={cssQuantityWrapper} title="Figures quantity">
          <LegoMinifigure cssClass={cssLegoIconFill} />
          <FigureQuantity quantity={quantity} fillColor={cssSvgFillColor} />
        </div>

        <div className=" justify-self-center">
          {/* show list view */}
          {!listView && (
            <BsListColumnsReverse
              fill={cssSvgFillColor}
              onClick={onHandleView}
              className="cursor-pointer filter-icon"
              title="List view"
            />
          )}
          {/* show card view */}
          {listView && (
            <BsGrid
              fill={cssSvgFillColor}
              onClick={onHandleView}
              className="cursor-pointer filter-icon"
              title="Card view"
            />
          )}
        </div>

        <div className="justify-self-end">
          {/* collapse filters */}
          {expandFilters && (
            <BsFilterSquareFill
              fill={cssSvgFillColor}
              onClick={handleExpandCollapseFilters}
              className="cursor-pointer filter-icon"
              title="Collapse filters"
            />
          )}
          {/* expand filters */}
          {!expandFilters && (
            <BsFilterSquare
              fill={cssSvgFillColor}
              onClick={handleExpandCollapseFilters}
              className="cursor-pointer filter-icon"
              title="Expand filters"
            ></BsFilterSquare>
          )}
        </div>
      </div>

      {expandFilters && (
        <div className={cssFilterBackground}>
          <div className="filter-item-wrapper justify-self-center relative">
            <div>
              <InputText
                onChange={handleChangeSearchingNumber}
                value={searchingNumber}
                name="number"
                maxLength="8"
                cssClass={cssInputText}
                cssClassLabel={cssClassLabel}
              >
                Number
              </InputText>
            </div>
            {searchingNumber && (
              <div
                className={`filter-reset-icon cursor-pointer ${cssImCross}`}
                onClick={handleResetSearchNumber}
              >
                <ImCross />
              </div>
            )}
          </div>
          <div className="filter-item-wrapper justify-self-center relative">
            <div>
              <InputText
                onChange={handleChangeSearchingMainName}
                value={searchingMainName}
                name="mainName"
                cssClass={cssInputText}
                cssClassLabel={cssClassLabel}
              >
                Name
              </InputText>
            </div>
            {searchingMainName && (
              <div
                className={`filter-reset-icon cursor-pointer ${cssImCross}`}
                onClick={handleResetSearchMainName}
              >
                <ImCross />
              </div>
            )}
          </div>
          <div className="filter-item-wrapper justify-self-center cursor-pointer relative">
            <div>
              <Dropdown
                cssClassLabel={cssClassLabel}
                cssDropdown={cssDropdown}
                cssPanelClass={cssPanelClass}
                cssDropdownElement={cssDropdownElement}
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
                className={`filter-reset-icon cursor-pointer ${cssImCross}`}
                onClick={handleResetSearchReleaseYear}
              >
                <ImCross />
              </div>
            )}
          </div>
          <div className="filter-item-wrapper justify-self-center cursor-pointer relative">
            <div>
              <Dropdown
                cssClassLabel={cssClassLabel}
                cssDropdown={cssDropdown}
                cssPanelClass={cssPanelClass}
                cssDropdownElement={cssDropdownElement}
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
                className={`filter-reset-icon cursor-pointer ${cssImCross}`}
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
