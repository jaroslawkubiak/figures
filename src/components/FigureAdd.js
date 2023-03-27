import "../css/figure-add.css";

import { useState } from "react";

function FigureAdd({ onSubmit }) {
  const [number, setNumber] = useState("");
  const [mainName, setMainName] = useState("");

  const handleChange = e => {
    console.log(e.target.name);

    switch (e.target.name) {
      case "number":
        // console.log("zmieniam number");
        setNumber(e.target.value);

        break;
      case "mainName":
        // console.log("zmieniam mainName");
        setMainName(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("number=", number, "nazwa=", mainName);
    // generating random ID
    const generateId = String(Math.random()).split(".");
    const newFigure = { id: generateId[1], number, mainName };
    onSubmit(newFigure);

    //reseting inputs fields
    setNumber("");
    setMainName("");
  };

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container">
      <div className="add-figure-close-btn"></div>
        <form onSubmit={handleSubmit}>
          <label>Numer</label>
          <br />
          <input
            value={number}
            autoComplete="off"
            name="number"
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Nazwa</label>
          <br />
          <input
            value={mainName}
            autoComplete="off"
            name="mainName"
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Dodaj</button>
        </form>
      </div>
    </div>
  );
}

export default FigureAdd;
