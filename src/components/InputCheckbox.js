function InputCheckbox({
  cssCheckboxClass,
  cssClassLabel,
  cssClass,
  checked,
  name,
  onChange,
  children,
}) {
  const isChecked = checked ? "checked" : "";
  return (
    <>
      <label className={cssClassLabel}>{children}</label>
      <div className="input-wrapper">
        <div className={cssClass}>
          <input
            className={cssCheckboxClass}
            type="checkbox"
            name={name}
            checked={isChecked}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

export default InputCheckbox;
