// error message for validating inputs
export const inputFieldNotValid = message => {
  return (
    <div className="required-field-container">
      <div className="required-field">{message}</div>
      <div className="required-field-after"></div>
    </div>
  );
};

// regex for validating only float input, only 2 digit after , or .
export const onlyNumbersRegex = /^-?\d*(?:[.,]\d{0,2})?$/;

// form validate
export function validate(values, isSubmit, duplicate) {
  const errors = {};
  if (duplicate) {
    errors.number = inputFieldNotValid("Have this");
  }
  if (isSubmit && values.number.length < 6)
    errors.number = inputFieldNotValid("Min 6 char");
  if (isSubmit && values.mainName === "")
    errors.mainName = inputFieldNotValid("Required");

  if (isSubmit && (values.purchasePrice < 0 || values.purchasePrice === ""))
    errors.purchasePrice = inputFieldNotValid("Required");
  if (isSubmit && values.releaseYear === "")
    errors.releaseYear = inputFieldNotValid("Required");
  if (isSubmit && values.purchaseDate === "")
    errors.purchaseDate = inputFieldNotValid("Required");
  if (isSubmit && values.series === "")
    errors.series = inputFieldNotValid("Required");
  if (isSubmit && values.weapon === "")
    errors.weapon = inputFieldNotValid("Required");
  return errors;
}
