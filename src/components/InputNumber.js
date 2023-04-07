import { Stormtrooper } from "../svg/Stormtrooper";

function InputNumber({
  value,
  children,
  maxLength,
  name,
  onChange,
  onFocus,
  number,
  required,
  cssClass,
}) {
  return (
    <>
      <label className="add-figure-input-label">{children}</label>
      <div className="input-wrapper">
        <input
          type="text"
          className={cssClass}
          autoComplete="off"
          maxLength={maxLength || ""}
          value={value}
          name={name}
          onChange={onChange}
          onFocus={onFocus}
          data-set={number}
        />
        {required && <span className="input-required">#</span>}
      </div>
    </>
  );
}

export default InputNumber;
