function InputCheckbox({
  cssCheckboxClass,
  cssClass,
  checked,
  name,
  onChange,
  children,
}) {
  const isChecked = checked ? "checked" : "";
  return (
    <>
      <label className="add-figure-input-label">{children}</label>
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
