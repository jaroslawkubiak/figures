import "../css/figure-add.css";
import Button from "./Button";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import Dropdown from "./Dropdown";
import InputCheckbox from "./InputCheckbox";
import FigurePhoto from "./FigurePhoto";
import { useState, useEffect } from "react";

import { ImCross } from "react-icons/im";
import { BsPlusLg } from "react-icons/bs";
import seriesList from "../data/seriesList.json";
import weaponList from "../data/weaponList.json";
import saveImageToHdd from "../utils/saveImageToHdd";
import {
  onlyNumbersRegex,
  validate,
  inputFieldNotValid,
} from "../utils/validate";
import { yearsList } from "../utils/yearList";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNumber,
  changeMainName,
  changeReleaseYear,
  changeAdditionalName,
  changeLabel,
  addFigure,
  changeBricklink,
  changeSeries,
  changePurchasePrice,
  changeWeapon,
  changePurchaseDate,
  changeBricklinkPrice,
} from "../store";

function FigureAdd({ onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [figureExistInDB, setFigureExistInDB] = useState(false);
  const svgBg = "svg-fill-primary";
  const cssClassLabel = "add-figure-input-label color-primary";

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // add figure form submit
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(currentFigure, true, figureExistInDB));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // saveImageToHdd(currentFigure.number);
      dispatch(addFigure(currentFigure));
      onClose();
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  const dispatch = useDispatch();
  const currentFigure = useSelector(state => {
    return {
      number: state.form.number,
      mainName: state.form.mainName,
      additionalName: state.form.additionalName,
      releaseYear: state.form.releaseYear,
      label: state.form.label,
      bricklink: state.form.bricklink,
      series: state.form.series,
      purchasePrice: state.form.purchasePrice,
      weapon: state.form.weapon,
      purchaseDate: state.form.purchaseDate,
      bricklinkPrice: state.form.bricklinkPrice,
    };
  });

  // getting today date
  const today = new Date()
    .toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll(".", "-");

  //setting initial value for number and date
  if (!currentFigure.number) currentFigure.number = "sw";
  if (!currentFigure.purchaseDate) currentFigure.purchaseDate = today;

  // handle change to inputs fields
  const handleChangeInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case "number":
        dispatch(changeNumber(value));
        break;
      case "mainName":
        dispatch(changeMainName(value));
        break;
      case "additionalName":
        dispatch(changeAdditionalName(value));
        break;
      case "bricklink":
        dispatch(changeBricklink(value));
        break;
      case "label":
        dispatch(changeLabel(e.target.checked));
        break;
      case "purchaseDate":
        dispatch(changePurchaseDate(value));
        break;

      // if input field is number - check if provided value is a number
      case "bricklinkPrice":
        if (onlyNumbersRegex.test(value)) dispatch(changeBricklinkPrice(value));
        break;
      case "purchasePrice":
        if (onlyNumbersRegex.test(value)) dispatch(changePurchasePrice(value));
        break;
      default:
        break;
    }
  };

  // handle change to dropdown menu list
  const handleChangeSelect = (value, name) => {
    setFormErrors({ ...formErrors, [name]: null });
    switch (name) {
      case "weapon":
        dispatch(changeWeapon(value));
        break;
      case "series":
        dispatch(changeSeries(value));
        break;
      case "releaseYear":
        dispatch(changeReleaseYear(value));
        break;
      default:
        break;
    }
  };

  // after error - when on focus input - clear error message
  const handleOnFocus = e => {
    setFormErrors({ ...formErrors, [e.target.name]: null });
  };

  // check if is mobile view to change font size for icon buttons
  const w = window.innerWidth;
  const btnCloseMobileView = w < 814 ? "font-size-1-4" : "font-size-2";
  const btnAddMobileView = w < 814 ? "font-size-1-6" : "font-size-2";

  // filtering all figures to find currently adding
  const allFigures = useSelector(({ figures: { data } }) => {
    return data.filter(fig =>
      fig.number.toLowerCase().includes(currentFigure.number.toLowerCase())
    );
  });

  useEffect(() => {
    if (currentFigure.number.length > 5 && allFigures.length === 1) {
      setFigureExistInDB(inputFieldNotValid("Have this"));
    } else {
      setFormErrors({ ...formErrors, number: null });
      setFigureExistInDB(false);
    }
  }, [currentFigure.number]);

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container">
        <div className="add-figure-close-btn" onClick={() => onClose()}>
          <ImCross className={`svg-fill-bg ${btnCloseMobileView}`} />
        </div>
        <form id="add-figure-form" onSubmit={handleSubmit}>
          <div className="add-header add-figure-heading">
            Add new minifigure
          </div>
          {/* Number */}
          <div className="add-figure-div add-number add-grid-cell">
            <InputText
              cssClass={`add-figure-input background-color-primary color-bg`}
              cssClassLabel={cssClassLabel}
              maxLength="8"
              name="number"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={currentFigure.number}
            >
              Number
            </InputText>
            {formErrors.number}
            {figureExistInDB}
          </div>
          {/* Image */}
          <div id="add-figure-photo" className="add-photo">
            <FigurePhoto figNumber={currentFigure.number} svgBg={svgBg} />
          </div>
          {/* Main name */}
          <div className="add-figure-div add-main-name add-grid-cell">
            <InputText
              cssClass="add-figure-input background-color-primary color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="22"
              name="mainName"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={currentFigure.mainName}
            >
              Main name
            </InputText>
            {formErrors.mainName}
          </div>
          {/* Additional name */}
          <div className="add-figure-div add-additional-name add-grid-cell">
            <InputText
              cssClass="add-figure-input background-color-primary color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="22"
              name="additionalName"
              onChange={handleChangeInput}
              value={currentFigure.additionalName}
            >
              Additional name
            </InputText>
          </div>
          {/* Purchase Price */}
          <div className="add-figure-div add-purchase-price add-grid-cell">
            <InputNumber
              cssClass="add-figure-input background-color-primary color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="7"
              name="purchasePrice"
              number="number"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={currentFigure.purchasePrice}
            >
              Purchase Price
            </InputNumber>
            {formErrors.purchasePrice}
          </div>
          {/* Bricklink Price */}
          <div className="add-figure-div add-bricklink-price add-grid-cell">
            <InputNumber
              cssClass="add-figure-input background-color-primary color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="7"
              number="number"
              name="bricklinkPrice"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              value={currentFigure.bricklinkPrice}
            >
              Bricklink av Price
            </InputNumber>
          </div>
          {/* Release Year */}
          <div className="add-figure-div add-release-year add-grid-cell cursor-pointer">
            <Dropdown
              cssDropdown="add-figure-input background-color-primary color-bg"
              cssPanelClass="add-figure-input background-color-primary color-bg select-height"
              cssDropdownElement="dropdown-el"
              cssClassLabel={cssClassLabel}
              name="releaseYear"
              onChange={handleChangeSelect}
              options={yearsList}
              placeholder="Select ..."
              required={true}
              value={currentFigure.releaseYear}
            >
              Release Year
            </Dropdown>
            {formErrors.releaseYear}
          </div>
          {/* Series */}
          <div className="add-figure-div add-series  add-grid-cell cursor-pointer">
            <Dropdown
              cssDropdown="add-figure-input background-color-primary color-bg"
              cssPanelClass="add-figure-input background-color-primary color-bg select-height"
              cssDropdownElement="dropdown-el"
              cssClassLabel={cssClassLabel}
              name="series"
              onChange={handleChangeSelect}
              options={seriesList}
              placeholder="Select ..."
              required={true}
              value={currentFigure.series}
            >
              Series
            </Dropdown>
            {formErrors.series}
          </div>
          {/* Bricklink */}
          <div className="add-figure-div add-bricklink add-grid-cell">
            <InputText
              cssClass="add-figure-input background-color-primary color-bg"
              cssClassLabel={cssClassLabel}
              name="bricklink"
              onChange={handleChangeInput}
              value={currentFigure.bricklink}
            >
              Bricklink
            </InputText>
          </div>
          {/* Label */}
          <div className="add-figure-div add-label add-grid-cell">
            <InputCheckbox
              cssClass="add-figure-checkbox-div"
              cssCheckboxClass="cursor-pointer"
              cssClassLabel={cssClassLabel}
              name="label"
              onChange={handleChangeInput}
              checked={currentFigure.label}
            >
              Label
            </InputCheckbox>
          </div>
          {/* Weapon */}
          <div className="add-figure-div add-weapon add-grid-cell cursor-pointer">
            <Dropdown
              cssDropdown="add-figure-input background-color-primary color-bg"
              cssPanelClass="add-figure-input background-color-primary color-bg select-height"
              cssDropdownElement="dropdown-el"
              cssClassLabel={cssClassLabel}
              name="weapon"
              onChange={handleChangeSelect}
              options={weaponList}
              placeholder="Select ..."
              required={true}
              value={currentFigure.weapon}
            >
              Weapon
            </Dropdown>
            {formErrors.weapon}
          </div>
          {/* Purchase date */}
          <div className="add-figure-div add-purchase-date add-grid-cell">
            <InputText
              cssClass="add-figure-input background-color-primary color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="10"
              name="purchaseDate"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={currentFigure.purchaseDate}
            >
              Purchase date
            </InputText>
            {formErrors.purchaseDate}
          </div>
          <div className="add-button">
            <Button cssClass="btn btn-add">
              <BsPlusLg className={btnAddMobileView} />
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FigureAdd;
