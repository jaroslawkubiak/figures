function InputNumber({
  cssClass,
  maxLength,
  name,
  number,
  onChange,
  onFocus,
  required,
  value,
  children,
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
