import "../css/figure-add.css";
import Button from './Button';
import { useState, useEffect } from "react";

function FigureAdd({ onSubmit, onClose }) {
  const [fig, setFig] = useState({ id: "", mainName: "", number: "" });

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
    };
    onSubmit(newFigure);
    onClose();
  };


  const addFigureBtn = (
    <div className="center">
      <Button>Save</Button>
    </div>
  );

  return (
    <div className="add-figure-wrapper">
      <div className="add-figure-container">
        <div className="add-figure-close-btn" onClick={() => onClose()}></div>
        <form onSubmit={handleSubmit}>
          <label className="add-figure-input-label">Numer</label>
          <div className="input-wrapper">
            <input
              type="text"
              className="add-figure-input"
              value={fig.number}
              autoComplete="off"
              name="number"
              maxLength={8}
              onChange={e => setFig({ ...fig, number: e.target.value })}
            />
          </div>
          <label className="add-figure-input-label">Nazwa</label>
          <div className="input-wrapper">
            <input
              type="text"
              className="add-figure-input"
              value={fig.mainName}
              autoComplete="off"
              name="mainName"
              onChange={e => setFig({ ...fig, mainName: e.target.value })}
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
