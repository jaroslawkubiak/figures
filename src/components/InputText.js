import "../css/figure-add.css";

function InputText({ value, children, maxLength, name, onChange }) {
  return (
    <>
      <label className="add-figure-input-label">{children}</label>
      <div className="input-wrapper">
        <input
          type="text"
          className="add-figure-input"
          autoComplete="off"
          maxLength={maxLength || ""}
          value={value}
          name={name}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default InputText;
