import Button from './Button';
import InputText from './InputText';
import InputNumber from './InputNumber';
import ConfirmModal from './ConfirmModal';
import Dropdown from './Dropdown';
import InputCheckbox from './InputCheckbox';
import FigurePhoto from './FigurePhoto';
import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import { BsTrash3, BsSave } from 'react-icons/bs';
import seriesList from '../data/seriesList.json';
import weaponList from '../data/weaponList.json';
import saveImageToHdd from '../utils/saveImageToHdd';
import editFigureInDB from '../utils/editFigureInDB';
import deleteFigureFromDB from '../utils/deleteFigureFromDB';

import { useDispatch, useSelector } from 'react-redux';
import { onlyNumbersRegex, validate, inputFieldNotValid } from '../utils/validate';
import { yearsList } from '../utils/yearList';

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
} from '../store';

function FigureEdit({ onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [deleteFigure, setDeleteFigure] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const cssClassLabel = 'add-figure-input-label color-edit';

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

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
  const [figureToDelete] = useState(figure);
  const [figureMainName] = useState(figure.mainName);
  const [figureNumber] = useState(figure.number);
  const [figureExistInDB, setFigureExistInDB] = useState(false);

  // filtering all figures to find currently adding
  const allFigures = useSelector(({ figures: { data } }) => {
    return data.filter(fig => fig.number.toLowerCase().includes(figure.number.toLowerCase()));
  });

  // edit figure form submit
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmit(true);
    editFigureInDB(figure);
    setFormErrors(validate(figure, true, figureExistInDB));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // saveImageToHdd(figure.number);
      dispatch(editFigure(figure));
      onClose();
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (figure.number.length > 5 && allFigures.length === 1 && figure.number !== figureNumber) {
      setFigureExistInDB(inputFieldNotValid('Have this'));
    } else {
      setFormErrors({ ...formErrors, number: null });
      setFigureExistInDB(false);
    }
  }, [figure.number]);

  // handle change to inputs fields
  const handleChangeInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'number':
        dispatch(editNumber(value));
        break;
      case 'mainName':
        dispatch(editMainName(value));
        break;
      case 'additionalName':
        dispatch(editAdditionalName(value));
        break;
      case 'bricklink':
        dispatch(editBricklink(value));
        break;
      case 'label':
        dispatch(editLabel(e.target.checked));
        break;
      case 'purchaseDate':
        dispatch(editPurchaseDate(value));
        break;

      // if input field is number - check if provided value is a number
      case 'bricklinkPrice':
        if (onlyNumbersRegex.test(value)) dispatch(editBricklinkPrice(value));
        break;
      case 'purchasePrice':
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
      case 'weapon':
        dispatch(editWeapon(value));
        break;
      case 'series':
        dispatch(editSeries(value));
        break;
      case 'releaseYear':
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
      deleteFigureFromDB(figureToDelete.id);
      onClose();
    }
  }, [deleteFigure]);

  //deleting figure
  const handleDelete = e => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  // after error - when on focus input - clear error message
  const handleOnFocus = e => {
    if (isSubmit) setFormErrors({ ...formErrors, [e.target.name]: null });
  };

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container edit-figure-border ">
        {showConfirmModal && <ConfirmModal figure={figure.mainName} onClose={onClose} onClick={onConfirmDelete} />}
        <div className="add-figure-close-btn background-color-edit" onClick={() => onClose()}>
          <ImCross className={`svg-fill-bg btn-close-svg `} />
        </div>
        <form id="add-figure-form" onSubmit={handleSubmit}>
          <div className="add-header add-figure-heading color-edit">edit - {figureMainName}</div>
          {/* Number */}
          <div className="add-figure-div add-number color-edit">
            <input type="hidden" value={figure.id} name="id" />
            <InputText
              cssClass="add-figure-input background-color-gray color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="8"
              name="number"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={false}
              disabled="disabled"
              value={figure.number}
            >
              number
            </InputText>
            {formErrors.number}
            {figureExistInDB}
          </div>
          {/* Image */}
          <div id="add-figure-photo" className="add-photo">
            <FigurePhoto figNumber={figure.number} cssSvgFill="svg-fill-edit" />
          </div>
          {/* Main name */}
          <div className="add-figure-div add-main-name color-edit">
            <InputText
              cssClass="add-figure-input background-color-edit color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="22"
              name="mainName"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={figure.mainName}
            >
              main name
            </InputText>
            {formErrors.mainName}
          </div>
          {/* Additional name */}
          <div className="add-figure-div add-additional-name color-edit">
            <InputText
              cssClass="add-figure-input background-color-edit color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="22"
              name="additionalName"
              onChange={handleChangeInput}
              value={figure.additionalName}
            >
              Additional name
            </InputText>
          </div>
          {/* Purchase Price */}
          <div className="add-figure-div add-purchase-price color-edit">
            <InputNumber
              cssClass="add-figure-input background-color-edit color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="7"
              name="purchasePrice"
              number="number"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={figure.purchasePrice}
            >
              purchase price
            </InputNumber>
            {formErrors.purchasePrice}
          </div>
          {/* Bricklink Price */}
          <div className="add-figure-div add-bricklink-price color-edit">
            <InputNumber
              cssClass="add-figure-input background-color-edit color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="7"
              number="number"
              name="bricklinkPrice"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              value={figure.bricklinkPrice}
            >
              bricklink av price
            </InputNumber>
          </div>
          {/* Release Year */}
          <div className="add-figure-div add-release-year cursor-pointer color-edit">
            <Dropdown
              cssClassLabel={cssClassLabel}
              cssDropdown="add-figure-input background-color-edit color-bg"
              cssPanelClass="add-figure-input select-height background-color-edit color-bg"
              cssDropdownElement="dropdown-el"
              name="releaseYear"
              onChange={handleChangeSelect}
              options={yearsList}
              placeholder="select..."
              required={true}
              value={figure.releaseYear}
            >
              release year
            </Dropdown>
            {formErrors.releaseYear}
          </div>
          {/* Series */}
          <div className="add-figure-div add-series cursor-pointer color-edit">
            <Dropdown
              cssClassLabel={cssClassLabel}
              cssDropdown="add-figure-input background-color-edit color-bg"
              cssPanelClass="add-figure-input select-height background-color-edit color-bg"
              cssDropdownElement="dropdown-el"
              name="series"
              onChange={handleChangeSelect}
              options={seriesList}
              placeholder="select..."
              required={true}
              value={figure.series}
            >
              series
            </Dropdown>
            {formErrors.series}
          </div>
          {/* Bricklink */}
          <div className="add-figure-div add-bricklink color-edit">
            <InputText
              cssClass="add-figure-input background-color-edit color-bg"
              cssClassLabel={cssClassLabel}
              name="bricklink"
              onChange={handleChangeInput}
              value={figure.bricklink}
            >
              bricklink
            </InputText>
          </div>
          {/* Label */}
          <div className="add-figure-div add-label color-edit">
            <InputCheckbox
              cssClass="add-figure-checkbox-div background-color-edit color-bg"
              cssCheckboxClass="cursor-pointer background-color-edit color-bg"
              cssClassLabel={cssClassLabel}
              name="label"
              onChange={handleChangeInput}
              checked={figure.label}
            >
              label
            </InputCheckbox>
          </div>
          {/* Weapon */}
          <div className="add-figure-div add-weapon cursor-pointer color-edit">
            <Dropdown
              cssClassLabel={cssClassLabel}
              cssDropdown="add-figure-input background-color-edit color-bg"
              cssPanelClass="add-figure-input select-height background-color-edit color-bg"
              cssDropdownElement="dropdown-el"
              name="weapon"
              onChange={handleChangeSelect}
              options={weaponList}
              placeholder="select..."
              required={true}
              value={figure.weapon}
            >
              weapon
            </Dropdown>
            {formErrors.weapon}
          </div>
          {/* Purchase date */}
          <div className="add-figure-div add-purchase-date color-edit">
            <InputText
              cssClass="add-figure-input background-color-edit color-bg"
              cssClassLabel={cssClassLabel}
              maxLength="10"
              name="purchaseDate"
              onChange={handleChangeInput}
              onFocus={handleOnFocus}
              required={true}
              value={figure.purchaseDate}
            >
              purchase date
            </InputText>
            {formErrors.purchaseDate}
          </div>
          <div className="add-button">
            <Button cssClass="btn btn-edit">
              <BsSave className="btn-edit-svg" />
              save
            </Button>
          </div>
          <div className="edit-delete-button">
            <Button cssClass="btn btn-delete " onClick={handleDelete}>
              <BsTrash3 className="btn-edit-svg" />
              delete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FigureEdit;
