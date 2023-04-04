function InputNumber({
  value,
  children,
  maxLength,
  name,
  onChange,
  onFocus,
  number,
  required,
}) {
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
          onFocus={onFocus}
          data-set={number}
        />
        {required && <span className="input-required">#</span>}
      </div>
    </>
  );
}

export default InputNumber;
