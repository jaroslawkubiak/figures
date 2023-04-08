import "../css/figure-add.css";
import Button from "./Button";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import Dropdown from "./Dropdown";
import InputCheckbox from "./InputCheckbox";
import FigurePhoto from "./FigurePhoto";
import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { saveAs } from "file-saver";
import seriesList from "../data/seriesList.json";
import weaponList from "../data/weaponList.json";
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

function FigureAdd({ onSubmit, onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // regex for validating only float input, only 2 digit after , or .
  const onlyNumbersRegex = /^-?\d*(?:[.,]\d{0,2})?$/;

  const svgBg = "svg-fill-primary";

  // error message for validating inputs
  const inputFieldNotValid = message => {
    return (
      <div className="required-field-container">
        <div className="required-field">{message}</div>
        <div className="required-field-after"></div>
      </div>
    );
  };

  // saving image to your local disk
  const saveImageToHdd = number => {
    // let url = `https://img.bricklink.com/ItemImage/MN/0/${number}.png`;
    // saveAs(url, number);
    // https://www.bricklink.com/v2/catalog/catalogitem.page?M=sw1078
    // https://img.bricklink.com/ItemImage/MN/0/sw1078.png
  };

  // adding figure when form don't have any errors
  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     // FIXME generating random ID - zmienić gdy już będzie baza danych
  //     const generateId = String(Math.random()).split(".");
  //     const newFigure = {
  //       id: generateId[1],
  //       number: fig.number,
  //       mainName: fig.mainName,
  //       additionalName: fig.additionalName,
  //       releaseYear: fig.releaseYear,
  //       series: fig.series,
  //       purchasePrice: fig.purchasePrice,
  //       bricklinkPrice: fig.bricklinkPrice,
  //       bricklink: fig.bricklink,
  //       weapon: fig.weapon,
  //       purchaseDate: fig.purchaseDate,
  //       label: fig.label,
  //     };

  //     saveImageToHdd(fig.number);
  //     onSubmit(newFigure);
  //     onClose();
  //   }
  // }, [formErrors]);

  // form validate
  const validate = values => {
    const errors = {};
    if (values.number.length < 6)
      errors.number = inputFieldNotValid("min 6 char");
    if (values.mainName === "")
      errors.mainName = inputFieldNotValid("required");
    if (values.purchasePrice < 0 || values.purchasePrice === "")
      errors.purchasePrice = inputFieldNotValid("required");
    if (values.releaseYear === "")
      errors.releaseYear = inputFieldNotValid("required");
    if (values.purchaseDate === "")
      errors.purchaseDate = inputFieldNotValid("required");
    if (values.series === "") errors.series = inputFieldNotValid("required");
    if (values.weapon === "") errors.weapon = inputFieldNotValid("required");
    return errors;
  };

  // add figure form submit
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addFigure(currentFigure));
    // dispatch(
    //   addFigure({
    //     number,
    //     mainName,
    //     additionalName,
    //     releaseYear,
    //     bricklink,
    //     label,
    //     series,
    //     purchasePrice,
    //     weapon,
    //     purchaseDate,
    //     bricklinkPrice,
    //   })
    // );
    setIsSubmit(true);

    // setFormErrors(validate(figure));
    onClose();
  };

  // creating list of years
  const yearsList = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1999; i--) yearsList.push(i);

  const dispatch = useDispatch();
  // const {
  //   number,
  //   mainName,
  //   additionalName,
  //   releaseYear,
  //   label,
  //   bricklink,
  //   series,
  //   purchasePrice,
  //   weapon,
  //   purchaseDate,
  //   bricklinkPrice,
  // } = useSelector(state => {
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
    if (isSubmit) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

  //handle change to dropdown menu list
  // const handleChangeSelect = (value, name) => {
  //   if (isSubmit) {
  //     setFormErrors({ ...formErrors, [name]: null });
  //   }
  //   setFig({ ...fig, [name]: value });
  // };

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container">
        <div className="add-figure-close-btn" onClick={() => onClose()}>
          <ImCross className="svg-fill-bg" />
        </div>
        <form id="add-figure-form" onSubmit={handleSubmit}>
          <div className="grid-full-line">Add new minifigure</div>
          {/* Number */}
          <div className="add-figure-div grid-2-left">
            <InputText
              cssClass="add-figure-input"
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
          </div>
          {/* Image */}
          <div id="add-figure-photo" className="add-figure-div grid-height-3">
            <FigurePhoto figNumber={currentFigure.number} svgBg={svgBg} />
          </div>
          {/* Main name */}
          <div className="add-figure-div grid-2-left">
            <InputText
              cssClass="add-figure-input"
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
          <div className="add-figure-div grid-2-left">
            <InputText
              cssClass="add-figure-input"
              maxLength="22"
              name="additionalName"
              onChange={handleChangeInput}
              value={currentFigure.additionalName}
            >
              Additional name
            </InputText>
          </div>
          {/* Purchase Price */}
          <div className="add-figure-div grid-2-left">
            <InputNumber
              cssClass="add-figure-input"
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
          <div className="add-figure-div grid-2-right">
            <InputNumber
              cssClass="add-figure-input"
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
          <div className="add-figure-div grid-2-left cursor-pointer">
            <Dropdown
              cssClass="add-figure-input"
              cssPanelClass="add-figure-input select-height"
              name="releaseYear"
              onChange={handleChangeSelect}
              options={yearsList}
              placeholder="Select year..."
              required={true}
              value={currentFigure.releaseYear}
            >
              Release Year
            </Dropdown>
            {formErrors.releaseYear}
          </div>
          {/* Series */}
          <div className="add-figure-div grid-2-right cursor-pointer">
            <Dropdown
              cssClass="add-figure-input"
              cssPanelClass="add-figure-input select-height"
              name="series"
              onChange={handleChangeSelect}
              options={seriesList}
              placeholder="Select series..."
              required={true}
              value={currentFigure.series}
            >
              Series
            </Dropdown>
            {formErrors.series}
          </div>
          {/* Bricklink */}
          <div className="add-figure-div grid-3-left">
            <InputText
              cssClass="add-figure-input"
              name="bricklink"
              onChange={handleChangeInput}
              value={currentFigure.bricklink}
            >
              Bricklink
            </InputText>
          </div>
          {/* Label */}
          <div className="add-figure-div grid-1-right">
            <InputCheckbox
              cssClass="add-figure-checkbox-div grid-center"
              cssCheckboxClass="cursor-pointer"
              name="label"
              onChange={handleChangeInput}
              value={currentFigure.label}
            >
              Label
            </InputCheckbox>
          </div>
          {/* Weapon */}
          <div className="add-figure-div grid-2-left cursor-pointer">
            <Dropdown
              cssClass="add-figure-input"
              cssPanelClass="add-figure-input select-height"
              name="weapon"
              onChange={handleChangeSelect}
              options={weaponList}
              placeholder="Select weapon..."
              required={true}
              value={currentFigure.weapon}
            >
              Weapon
            </Dropdown>
            {formErrors.weapon}
          </div>
          {/* Purchase date */}
          <div className="add-figure-div grid-2-right">
            <InputText
              cssClass="add-figure-input"
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
          <div className="grid-full-line">
            <Button cssClass="button">Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FigureAdd;
