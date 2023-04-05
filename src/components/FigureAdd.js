import "../css/figure-add.css";
import Button from "./Button";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import Dropdown from "./Dropdown";
import InputCheckbox from "./InputCheckbox";
import FigurePhoto from "./FigurePhoto";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";

function FigureAdd({ onSubmit, onClose }) {
  // getting today date
  const today = new Date()
    .toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll(".", "-");

  // initial object of figure to add
  const initialState = {
    id: "",
    mainName: "",
    additionalName: "",
    number: "sw",
    releaseYear: "",
    series: "",
    purchasePrice: "",
    bricklinkPrice: "",
    purchaseDate: today,
    bricklink: "",
    weapon: "",
    label: "",
  };

  const [fig, setFig] = useState(initialState);
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
  const saveImageToHdd = (number) => {
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
    setIsSubmit(true);
    setFormErrors(validate(fig));
  };

  // FIXME list of figure series, weapons, years list, later fetch from DB
  const seriesList = [
    "Battlefront",
    "Clone Wars",
    "Episode 1",
    "Episode 2",
    "Episode 3",
    "Episode 4/5/6",
    "Episode 7",
    "Episode 8",
    "Episode 9",
    "Legends",
    "NOT MINIFIGURE",
    "Old Republic",
    "Others",
    "Rebels",
    "Resistance",
    "Rogue One",
    "Solo",
    "The Freemaker Adventures",
    "Yoda Chronicles",
    "The Bad Batch",
    "The Mandalorian",
  ];
  const weaponList = ["yes", "no", "buy"];

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

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container">
        {/* <pre>{JSON.stringify(fig, undefined, 2)}</pre> */}
        <div className="add-figure-close-btn" onClick={() => onClose()}></div>
        <form id="add-figure-form" onSubmit={handleSubmit}>
          {/* Number */}
          <div className="add-figure-div grid-2-left">
            <InputText
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.number}
              name="number"
              maxLength="8"
              required={true}
            >
              Number
            </InputText>
            {formErrors.number}
          </div>
          {/* Image */}
          <div id="add-figure-photo" className="add-figure-div grid-height-3">
            <FigurePhoto figNumber={fig.number} />
          </div>
          {/* Main name */}
          <div className="add-figure-div grid-2-left">
            <InputText
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.mainName}
              name="mainName"
              required={true}
              maxLength="22"
            >
              Main name
            </InputText>
            {formErrors.mainName}
          </div>
          {/* Additional name */}
          <div className="add-figure-div grid-2-left">
            <InputText
              onChange={handleChange}
              value={fig.additionalName}
              name="additionalName"
              maxLength="22"
            >
              Additional name
            </InputText>
          </div>
          {/* Purchase Price */}
          <div className="add-figure-div grid-2-left">
            <InputNumber
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.purchasePrice}
              name="purchasePrice"
              maxLength="7"
              number="number"
              required={true}
            >
              Purchase Price
            </InputNumber>
            {formErrors.purchasePrice}
          </div>
          {/* Bricklink Price */}
          <div className="add-figure-div grid-2-right">
            <InputNumber
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.bricklinkPrice}
              name="bricklinkPrice"
              maxLength="7"
              number="number"
            >
              Bricklink av Price
            </InputNumber>
          </div>
          {/* Release Year */}
          <div className="add-figure-div grid-2-left cursor-pointer">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.releaseYear}
              name="releaseYear"
              options={yearsList}
              placeholder="Select year..."
              required={true}
            >
              Release Year
            </Dropdown>
            {formErrors.releaseYear}
          </div>
          {/* Series */}
          <div className="add-figure-div grid-2-right cursor-pointer">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.series}
              name="series"
              options={seriesList}
              placeholder="Select series..."
              required={true}
            >
              Series
            </Dropdown>
            {formErrors.series}
          </div>
          {/* Bricklink */}
          <div className="add-figure-div grid-3-left">
            <InputText
              onChange={handleChange}
              value={fig.bricklink}
              name="bricklink"
            >
              Bricklink
            </InputText>
          </div>
          {/* Label */}
          <div className="add-figure-div grid-1-right">
            <InputCheckbox onChange={handleChange} name="label">
              Label
            </InputCheckbox>
          </div>
          {/* Weapon */}
          <div className="add-figure-div grid-2-left cursor-pointer">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.weapon}
              name="weapon"
              options={weaponList}
              placeholder="Select weapon..."
            >
              Weapon
            </Dropdown>
            {formErrors.weapon}
          </div>
          {/* Purchase date */}
          <div className="add-figure-div grid-2-right">
            <InputText
              onChange={handleChange}
              onFocus={handleOnFocus}
              value={fig.purchaseDate}
              name="purchaseDate"
              maxLength="8"
              required={true}
            >
              Purchase date
            </InputText>
            {formErrors.purchaseDate}
          </div>
          <div className="grid-full-line">
            <Button>Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FigureAdd;
