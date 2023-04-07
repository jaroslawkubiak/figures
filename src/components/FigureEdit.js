// import "../css/figure-edit.css";
import Button from "./Button";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import Dropdown from "./Dropdown";
import InputCheckbox from "./InputCheckbox";
import FigurePhoto from "./FigurePhoto";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { ImCross } from "react-icons/im";
import seriesList from "../data/seriesList.json";
import weaponList from "../data/weaponList.json";

function FigureEdit({ onSubmit, onClose, figure }) {
  // TODO - usuwanie przeniesc do edycji figurki
  // const handleClick = () => {
  //   onDelete(figure.id);
  // };

  console.log("figureEdit =", figure);

  const [fig, setFig] = useState(figure);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // for showing and hidding add figure form
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

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
    let url = `https://img.bricklink.com/ItemImage/MN/0/${number}.png`;
    saveAs(url, number);
    // https://www.bricklink.com/v2/catalog/catalogitem.page?M=sw1078
    // https://img.bricklink.com/ItemImage/MN/0/sw1078.png
  };

  // adding figure when form don't hava any errors
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // FIXME generating random ID - zmienić gdy już będzie baza danych
      const generateId = String(Math.random()).split(".");
      const newFigure = {
        id: generateId[1],
        number: fig.number,
        mainName: fig.mainName,
        additionalName: fig.additionalName,
        releaseYear: fig.releaseYear,
        series: fig.series,
        purchasePrice: fig.purchasePrice,
        bricklinkPrice: fig.bricklinkPrice,
        bricklink: fig.bricklink,
        weapon: fig.weapon,
        purchaseDate: fig.purchaseDate,
        label: fig.label,
      };

      saveImageToHdd(fig.number);
      onSubmit(newFigure);
      onClose();
    }
  }, [formErrors]);

  // form validate
  const validate = values => {
    const errors = {};
    // if (values.number.length < 6)
    //   errors.number = inputFieldNotValid("min 6 char");
    if (values.mainName === "")
      errors.mainName = inputFieldNotValid("required");
    // if (values.purchasePrice < 0 || values.purchasePrice === "")
    //   errors.purchasePrice = inputFieldNotValid("required");
    // if (values.releaseYear === "")
    //   errors.releaseYear = inputFieldNotValid("required");
    // if (values.purchaseDate === "")
    //   errors.purchaseDate = inputFieldNotValid("required");
    // if (values.series === "") errors.series = inputFieldNotValid("required");
    // if (values.weapon === "") errors.weapon = inputFieldNotValid("required");
    return errors;
  };

  // add figure form submit
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(fig));
  };

  const yearsList = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1999; i--) yearsList.push(i);

  // regex for validating only float input, only 2 digit after , or .
  const onlyNumbersRegex = /^-?\d*(?:[.,]\d{0,2})?$/;

  // handle change to input text and number fields
  const handleChange = e => {
    const { name, value } = e.target;
    if (e.target.dataset.set !== "number") setFig({ ...fig, [name]: value });
    else if (onlyNumbersRegex.test(value)) {
      setFig({ ...fig, [name]: value.replace(/,/g, ".") });
    }
  };

  // after error - when on focus input - clear error message
  const handleOnFocus = e => {
    if (isSubmit) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

  //handle change to dropdown menu list
  const handleChangeSelect = (value, name) => {
    if (isSubmit) {
      setFormErrors({ ...formErrors, [name]: null });
    }
    setFig({ ...fig, [name]: value });
  };

  const svgBg = "svg-fill-edit";
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
          {/* Number */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputText
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.number}
              name="number"
              maxLength="8"
              required={true}
              cssClass="add-figure-input background-color-edit"
            >
              Number
            </InputText>
            {formErrors.number}
          </div>
          {/* Image */}
          <div id="add-figure-photo" className="add-figure-div grid-height-3">
            <FigurePhoto figNumber={fig.number} svgBg={svgBg} />
          </div>
          {/* Main name */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputText
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.mainName}
              name="mainName"
              required={true}
              maxLength="22"
              cssClass="add-figure-input background-color-edit"
            >
              Main name
            </InputText>
            {formErrors.mainName}
          </div>
          {/* Additional name */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputText
              onChange={handleChange}
              value={fig.additionalName}
              name="additionalName"
              maxLength="22"
              cssClass="add-figure-input background-color-edit"
            >
              Additional name
            </InputText>
          </div>
          {/* Purchase Price */}
          <div className="add-figure-div grid-2-left edit-figure-color">
            <InputNumber
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.purchasePrice}
              name="purchasePrice"
              maxLength="7"
              number="number"
              required={true}
              cssClass="add-figure-input background-color-edit"
            >
              Purchase Price
            </InputNumber>
            {formErrors.purchasePrice}
          </div>
          {/* Bricklink Price */}
          <div className="add-figure-div grid-2-right edit-figure-color">
            <InputNumber
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.bricklinkPrice}
              name="bricklinkPrice"
              maxLength="7"
              number="number"
              cssClass="add-figure-input background-color-edit"
            >
              Bricklink av Price
            </InputNumber>
          </div>
          {/* Release Year */}
          <div className="add-figure-div grid-2-left cursor-pointer edit-figure-color">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.releaseYear}
              name="releaseYear"
              options={yearsList}
              placeholder="Select year..."
              required={true}
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
            >
              Release Year
            </Dropdown>
            {formErrors.releaseYear}
          </div>
          {/* Series */}
          <div className="add-figure-div grid-2-right cursor-pointer edit-figure-color">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.series}
              name="series"
              options={seriesList}
              placeholder="Select series..."
              required={true}
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
            >
              Series
            </Dropdown>
            {formErrors.series}
          </div>
          {/* Bricklink */}
          <div className="add-figure-div grid-3-left edit-figure-color">
            <InputText
              onChange={handleChange}
              value={fig.bricklink}
              name="bricklink"
              cssClass="add-figure-input background-color-edit"
            >
              Bricklink
            </InputText>
          </div>
          {/* Label */}
          <div className="add-figure-div grid-1-right edit-figure-color">
            <InputCheckbox
              onChange={handleChange}
              name="label"
              cssClass="add-figure-checkbox-div grid-center background-color-edit"
              cssCheckboxClass="cursor-pointer background-color-edit"
            >
              Label
            </InputCheckbox>
          </div>
          {/* Weapon */}
          <div className="add-figure-div grid-2-left cursor-pointer edit-figure-color">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.weapon}
              name="weapon"
              options={weaponList}
              placeholder="Select weapon..."
              required={true}
              cssClass="add-figure-input background-color-edit"
              cssPanelClass="add-figure-input select-height background-color-edit"
            >
              Weapon
            </Dropdown>
            {formErrors.weapon}
          </div>
          {/* Purchase date */}
          <div className="add-figure-div grid-2-right edit-figure-color">
            <InputText
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.purchaseDate}
              name="purchaseDate"
              maxLength="8"
              required={true}
              cssClass="add-figure-input background-color-edit"
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
