function InputText({
  value,
  children,
  maxLength,
  name,
  onChange,
  required,
  onFocus,
  cssClass
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
        />
        {required && <span className="input-required">#</span>}
      </div>
    </>
  );
}

export default InputText;
