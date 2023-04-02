import "../css/figure-add.css";
import Button from "./Button";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import Dropdown from "./Dropdown";
import InputCheckbox from "./InputCheckbox";
import FigurePhoto from "./FigurePhoto";
import { useState, useEffect } from "react";
//TODO
// download photo from server to app
// add calendar to pick a date
// loading spinner when loading img from server
function FigureAdd({ onSubmit, onClose }) {
  const [fig, setFig] = useState({
    id: "",
    mainName: "",
    secondName: "",
    number: "sw",
    releaseYear: "",
    series: "",
    purchasePrice: "",
    purchaseDate: "",
    bricklink: "",
    weapon: "",
    label: "",
  });
  // console.log(fig);
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // FIXME generating random ID - zmienić gdy już będzie baza danych
    const generateId = String(Math.random()).split(".");
    const newFigure = {
      id: generateId[1],
      number: fig.number,
      mainName: fig.mainName,
      secondName: fig.secondName,
      releaseYear: fig.releaseYear,
      series: fig.series,
      purchasePrice: fig.purchasePrice,
      bricklink: fig.bricklink,
      weapon: fig.weapon,
      purchaseDate: fig.purchaseDate,
      label: fig.label,
    };
    onSubmit(newFigure);
    onClose();
  };

  const addFigureBtn = (
    <div className="grid-full-line">
      <Button>Add</Button>
    </div>
  );

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

  //regex for validating only float input, only 2 digit after , or .
  const onlyNumbersRegex = /^-?\d*(?:[.,]\d{0,2})?$/;

  // handle change to input text and number fields
  const handleChange = e => {
    const propertyName = e.target.name;
    const inputValue = e.target.value;

    if (e.target.dataset.set !== "number")
      setFig({ ...fig, [propertyName]: inputValue });
    else if (onlyNumbersRegex.test(inputValue)) {
      setFig({ ...fig, [propertyName]: inputValue.replace(/,/g, ".") });
    }
  };

  //handle change to dropdown menu list
  const handleChangeSelect = (value, name) => {
    setFig({ ...fig, [name]: value });
  };

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container">
        <div className="add-figure-close-btn" onClick={() => onClose()}></div>
        <form id="add-figure-form" onSubmit={handleSubmit}>
          <div className="add-figure-div grid-2-left">
            <InputText
              onChange={handleChange}
              value={fig.number}
              name="number"
              maxLength="8"
            >
              Number
            </InputText>
          </div>
          <div id="add-figure-photo" className="add-figure-div grid-height-3">
            <FigurePhoto figNumber={fig.number} />
          </div>
          <div className="add-figure-div grid-2-left">
            <InputText
              onChange={handleChange}
              value={fig.mainName}
              name="mainName"
            >
              Name
            </InputText>
          </div>
          <div className="add-figure-div grid-2-left">
            <InputText
              onChange={handleChange}
              value={fig.secondName}
              name="secondName"
            >
              Second name
            </InputText>
          </div>
          <div className="add-figure-div grid-2-left">
            <InputNumber
              onChange={handleChange}
              value={fig.purchasePrice}
              name="purchasePrice"
              maxLength="7"
              number="number"
            >
              Purchase Price
            </InputNumber>
          </div>

          <div className="add-figure-div grid-2-left cursor-pointer">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.releaseYear}
              name="releaseYear"
              options={yearsList}
              placeholder="Select year..."
            >
              Release Year
            </Dropdown>
          </div>
          <div className="add-figure-div grid-2-right cursor-pointer">
            <Dropdown
              onChange={handleChangeSelect}
              value={fig.series}
              name="series"
              options={seriesList}
              placeholder="Select series..."
            >
              Series
            </Dropdown>
          </div>

          <div className="add-figure-div grid-3-left">
            <InputText
              onChange={handleChange}
              value={fig.briclink}
              name="briclink"
            >
              Briclink
            </InputText>
          </div>

          <div className="add-figure-div grid-1-right">
            <InputCheckbox onChange={handleChange} name="label">
              Label
            </InputCheckbox>
          </div>
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
          </div>
          <div className="add-figure-div grid-2-right">
            <InputText
              onChange={handleChange}
              value={fig.purchaseDate}
              name="purchaseDate"
              maxLength="8"
            >
              Purchase date
            </InputText>
          </div>

          {addFigureBtn}
        </form>
      </div>
    </div>
  );
}

export default FigureAdd;
