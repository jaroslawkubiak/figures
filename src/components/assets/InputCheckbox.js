function InputCheckbox({ cssCheckboxClass, cssClassLabel, cssClass, checked, name, onChange, children }) {
  const isChecked = checked ? 'checked' : '';
  return (
    <>
      <label className={cssClassLabel}>{children}</label>
      <div className="input-wrapper">
        <div className={cssClass}>
          <div className="checkbox-container">
            <input
              name={name}
              checked={isChecked}
              onChange={onChange}
              className={cssCheckboxClass}
              type="checkbox"
              id="cb"
            />
            <label htmlFor="cb"></label>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputCheckbox;
