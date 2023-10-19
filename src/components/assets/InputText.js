function InputText({
  cssClass,
  cssClassLabel,
  maxLength,
  name,
  onChange,
  onFocus,
  required,
  disabled,
  value,
  placeholder,
  children,
}) {
  return (
    <>
      <label className={cssClassLabel}>{children}</label>
      <div className="input-wrapper">
        <input
          type="text"
          className={cssClass}
          autoComplete="off"
          maxLength={maxLength || ''}
          value={value}
          name={name}
          placeholder={placeholder || ''}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
        />
        {required && <span className="input-required">#</span>}
      </div>
    </>
  );
}

export default InputText;
