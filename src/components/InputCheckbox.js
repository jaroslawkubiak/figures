function InputCheckbox({
  cssCheckboxClass,
  cssClass,
  name,
  onChange,
  children,
}) {
  return (
    <>
      <label className="add-figure-input-label">{children}</label>
      <div className="input-wrapper">
        <div className={cssClass}>
          <input
            className={cssCheckboxClass}
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
