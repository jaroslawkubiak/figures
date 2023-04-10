import Button from "./Button";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import Dropdown from "./Dropdown";
import InputCheckbox from "./InputCheckbox";
import FigurePhoto from "./FigurePhoto";
import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import seriesList from "../data/seriesList.json";
import weaponList from "../data/weaponList.json";
import { useDispatch, useSelector } from "react-redux";

import { onlyNumbersRegex, validate, yearsList } from "../js/helpers";
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

function FigureEdit({ onSubmit, onClose, figure }) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

console.log('figedit-',figure);

  const dispatch = useDispatch();
  // const currentFigure = useSelector(state => {
  //   return {
  //     number: state.form.number,
  //     mainName: state.form.mainName,
  //     additionalName: state.form.additionalName,
  //     releaseYear: state.form.releaseYear,
  //     label: state.form.label,
  //     bricklink: state.form.bricklink,
  //     series: state.form.series,
  //     purchasePrice: state.form.purchasePrice,
  //     weapon: state.form.weapon,
  //     purchaseDate: state.form.purchaseDate,
  //     bricklinkPrice: state.form.bricklinkPrice,
  //   };
  // });


  const svgBg = "svg-fill-edit";

  // for showing and hidding add figure form
  // useEffect(() => {
  //   document.body.classList.add("overflow-hidden");

  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // }, []);

  // // add figure form submit
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setIsSubmit(true);
  //   setFormErrors(validate(fig));
  // };


  // add figure form submit
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmit(true);
    // setFormErrors(validate(editFigure));

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // saveImageToHdd(figure.number);
      // dispatch(addFigure(editFigure));
      // onClose();
    }
  };


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
        dispatch(changeLabel(value));
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
    if (isSubmit) setFormErrors({ ...formErrors, [name]: null });

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
    if (isSubmit) setFormErrors({ ...formErrors, [e.target.name]: null });
  };


  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container edit-figure-border">
        <div
          className="add-figure-close-btn background-color-edit"
          onClick={() => onClose()}
        >
          <ImCross className="svg-fill-bg" />
        </div>
        <form id="add-figure-form" onSubmit={handleSubmit}>
          <div className="grid-full-line add-figure-heading edit-figure-color">
            Edit minifigure {figure.mainName}
          </div>

          {/* Number */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputText
              cssClass="add-figure-input background-color-edit"
              maxLength="8"
              name="number"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={figure.number}
            >
              Number
            </InputText>
            {formErrors.number}
          </div>
          {/* Image */}
          <div id="add-figure-photo" className="add-figure-div grid-height-3">
            {/* <FigurePhoto figNumber={figurenumber} svgBg={svgBg} /> */}
          </div>


          {/* Main name */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputText
              cssClass="add-figure-input background-color-edit"
              maxLength="22"
              name="mainName"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={figure.mainName}
            >
              Main name
            </InputText>
            {formErrors.mainName}
          </div>
          {/* Additional name */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputText
              cssClass="add-figure-input background-color-edit"
              maxLength="22"
              name="additionalName"
              onChange={handleChangeInput}
              value={figure.additionalName}
            >
              Additional name
            </InputText>
          </div>
          {/* Purchase Price */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputNumber
              cssClass="add-figure-input background-color-edit"
              maxLength="7"
              name="purchasePrice"
              number="number"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={figure.purchasePrice}
            >
              Purchase Price
            </InputNumber>
            {formErrors.purchasePrice}
          </div>
          {/* Bricklink Price */}
          <div className="add-figure-div grid-2-right edit-figure-color">
            <InputNumber
              cssClass="add-figure-input background-color-edit"
              maxLength="7"
              number="number"
              name="bricklinkPrice"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              value={figure.bricklinkPrice}
            >
              Bricklink av Price
            </InputNumber>
          </div>
          {/* Release Year */}
          <div className="add-figure-div grid-2-left cursor-pointer edit-figure-color">
            <Dropdown
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
              name="releaseYear"
              onChange={handleChangeSelect}
              options={yearsList}
              placeholder="Select year..."
              required={true}
              value={figure.releaseYear}
            >
              Release Year
            </Dropdown>
            {formErrors.releaseYear}
          </div>
          {/* Series */}
          <div className="add-figure-div grid-2-right cursor-pointer edit-figure-color">
            <Dropdown
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
              name="series"
              onChange={handleChangeSelect}
              options={seriesList}
              placeholder="Select series..."
              required={true}
              value={figure.series}
            >
              Series
            </Dropdown>
            {formErrors.series}
          </div>
          {/* Bricklink */}
          <div className="add-figure-div grid-3-left edit-figure-color">
            <InputText
              cssClass="add-figure-input background-color-edit"
              name="bricklink"
              onChange={handleChangeInput}
              value={figure.bricklink}
            >
              Bricklink
            </InputText>
          </div>
          {/* Label */}
          <div className="add-figure-div grid-1-right edit-figure-color">
            <InputCheckbox
              cssClass="add-figure-checkbox-div grid-center background-color-edit"
              cssCheckboxClass="cursor-pointer background-color-edit"
              name="label"
              onChange={handleChangeInput}
              checked={figure.label}
            >
              Label
            </InputCheckbox>
          </div>
          {/* Weapon */}
          <div className="add-figure-div grid-2-left cursor-pointer edit-figure-color">
            <Dropdown
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
              name="weapon"
              onChange={handleChangeSelect}
              options={weaponList}
              placeholder="Select weapon..."
              required={true}
              value={figure.weapon}
            >
              Weapon
            </Dropdown>
            {formErrors.weapon}
          </div>
          {/* Purchase date */}
          <div className="add-figure-div grid-2-right edit-figure-color">
            <InputText
              cssClass="add-figure-input background-color-edit"
              maxLength="10"
              name="purchaseDate"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={figure.purchaseDate}
            >
              Purchase date
            </InputText>
            {formErrors.purchaseDate}
          </div>
          <div className="grid-full-line">
            <Button cssClass="button-edit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FigureEdit;
