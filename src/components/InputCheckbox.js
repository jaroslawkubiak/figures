import "../css/figure-add.css";

function InputCheckbox({ children, name, onChange }) {
  return (
    <>
      <label className="add-figure-input-label">{children}</label>
      <div className="input-wrapper ">
        <div className="add-figure-checkbox-div grid-center">
          <input
          className="cursor-pointer"
            type="checkbox"
            name={name}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

export default InputCheckbox;
