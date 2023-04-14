import Button from "./Button";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import ConfirmModal from "./ConfirmModal";
import Dropdown from "./Dropdown";
import InputCheckbox from "./InputCheckbox";
import FigurePhoto from "./FigurePhoto";
import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import seriesList from "../data/seriesList.json";
import weaponList from "../data/weaponList.json";
import saveImageToHdd from "../js/saveImageToHdd";

import { useDispatch, useSelector } from "react-redux";
import { onlyNumbersRegex, validate, yearsList } from "../js/helpers";
import {
  editNumber,
  editMainName,
  editReleaseYear,
  editAdditionalName,
  editLabel,
  editFigure,
  removeFigure,
  editBricklink,
  editSeries,
  editPurchasePrice,
  editWeapon,
  editPurchaseDate,
  editBricklinkPrice,
} from "../store";

function FigureEdit({ onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [deleteFigure, setDeleteFigure] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [figureToDelete, setFigureToDelete] = useState(false);

  const dispatch = useDispatch();
  const figure = useSelector(state => {
    return {
      id: state.edit.id,
      number: state.edit.number,
      mainName: state.edit.mainName,
      additionalName: state.edit.additionalName,
      releaseYear: state.edit.releaseYear,
      label: state.edit.label,
      bricklink: state.edit.bricklink,
      series: state.edit.series,
      purchasePrice: state.edit.purchasePrice,
      weapon: state.edit.weapon,
      purchaseDate: state.edit.purchaseDate,
      bricklinkPrice: state.edit.bricklinkPrice,
    };
  });
  const svgBg = "svg-fill-edit";

  // edit figure form submit
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(figure));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // saveImageToHdd(figure.number);
      dispatch(editFigure(figure));
      onClose();
    }
  }, [isSubmit]);

  // handle change to inputs fields
  const handleChangeInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case "number":
        dispatch(editNumber(value));
        break;
      case "mainName":
        dispatch(editMainName(value));
        break;
      case "additionalName":
        dispatch(editAdditionalName(value));
        break;
      case "bricklink":
        dispatch(editBricklink(value));
        break;
      case "label":
        dispatch(editLabel(e.target.checked));
        break;
      case "purchaseDate":
        dispatch(editPurchaseDate(value));
        break;

      // if input field is number - check if provided value is a number
      case "bricklinkPrice":
        if (onlyNumbersRegex.test(value)) dispatch(editBricklinkPrice(value));
        break;
      case "purchasePrice":
        if (onlyNumbersRegex.test(value)) dispatch(editPurchasePrice(value));
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
        dispatch(editWeapon(value));
        break;
      case "series":
        dispatch(editSeries(value));
        break;
      case "releaseYear":
        dispatch(editReleaseYear(value));
        break;
      default:
        break;
    }
  };

  const onConfirmDelete = () => {
    setShowConfirmModal(false);
    setDeleteFigure(true);
  };

  useEffect(() => {
    if (deleteFigure) {
      dispatch(removeFigure(figureToDelete.id));
      onClose();
    }
  }, [deleteFigure]);

  //deleting figure
  const handleDelete = fig => {
    setShowConfirmModal(true);
    setFigureToDelete(fig);
  };

  // after error - when on focus input - clear error message
  const handleOnFocus = e => {
    if (isSubmit) setFormErrors({ ...formErrors, [e.target.name]: null });
  };

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container edit-figure-border">
        {showConfirmModal && (
          <ConfirmModal
            figure={figure.mainName}
            onClose={onClose}
            onClick={onConfirmDelete}
          />
        )}
        <div
          className="add-figure-close-btn background-color-edit"
          onClick={() => onClose()}
        >
          <ImCross className="svg-fill-bg" />
        </div>
        <form id="add-figure-form" onSubmit={handleSubmit}>
          <div className="grid-full-line add-figure-heading color-edit">
            Edit - {figure.mainName}
          </div>
          {/* Number */}
          <div className="add-figure-div grid-2-left color-edit">
            <input type="hidden" value={figure.id} name="id" />
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
            <FigurePhoto figNumber={figure.number} svgBg={svgBg} />
          </div>
          {/* Main name */}
          <div className="add-figure-div grid-2-left color-edit">
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
          <div className="add-figure-div grid-2-left color-edit">
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
          <div className="add-figure-div grid-2-left color-edit">
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
          <div className="add-figure-div grid-2-left color-edit">
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
          <div className="add-figure-div grid-2-left cursor-pointer color-edit">
            <Dropdown
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
              cssDropdownElement="dropdown-el"
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
          <div className="add-figure-div grid-2-right cursor-pointer color-edit">
            <Dropdown
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
              cssDropdownElement="dropdown-el"
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
          <div className="add-figure-div grid-3-left color-edit">
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
          <div className="add-figure-div grid-1-right color-edit">
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
          <div className="add-figure-div grid-2-left cursor-pointer color-edit">
            <Dropdown
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
              cssDropdownElement="dropdown-el"
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
          <div className="add-figure-div grid-2-right color-edit">
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
        <div className="grid-full-line grid-center">
          <Button cssClass="button-delete" onClick={() => handleDelete(figure)}>
            delete minifigure
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FigureEdit;
