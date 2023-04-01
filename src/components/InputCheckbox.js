import "../css/figure-add.css";

function InputCheckbox({ children, value, name, onChange }) {
  console.log("value=", value);
  return (
    <>
      <label className="add-figure-input-label">{children}</label>
      <div className="input-wrapper ">
        <div className="add-figure-checkbox-div grid-center">
          <input
            type="checkbox"
            // className="add-figure-checkbox"
            name={name}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

export default InputCheckbox;
