import "../css/figure-add.css";

import { useState, useEffect } from "react";

function FigureAdd({ onSubmit, onClose }) {
  const [number, setNumber] = useState("");
  const [mainName, setMainName] = useState("");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleChange = e => {
    // console.log(e.target.name);

    switch (e.target.name) {
      case "number":
        setNumber(e.target.value);

        break;
      case "mainName":
        setMainName(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // FIXME generating random ID - zmienić gdy już będzie baza danych
    const generateId = String(Math.random()).split(".");
    const newFigure = { id: generateId[1], number, mainName };
    onSubmit(newFigure);

    onClose();
  };

  const handleClose = () => onClose();

  const addFigureBtn = <div className="center"><button className="btn-add-figure">Dodaj</button></div>;

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container">
        <div className="add-figure-close-btn" onClick={handleClose}></div>
        <form onSubmit={handleSubmit}>
          <label className="add-figure-input-label">Numer</label>
          <div className="input-wrapper">
            <input
              className="add-figure-input"
              value={number}
              autoComplete="off"
              name="number"
              maxLength={8}
              onChange={handleChange}
            />
            </div>
          <label className="add-figure-input-label">Nazwa</label>
          <div className="input-wrapper">
            <input
              className="add-figure-input"
              value={mainName}
              autoComplete="off"
              name="mainName"
              onChange={handleChange}
            />
            </div>
          {addFigureBtn}
          {/* {number && mainName && addFigureBtn} */}
        </form>
      </div>
    </div>
  );
}

export default FigureAdd;
