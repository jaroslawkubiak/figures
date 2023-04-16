// error message for validating inputs
const inputFieldNotValid = message => {
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
  export const validate = values => {
    const errors = {};
    if (values.number.length < 6)
      errors.number = inputFieldNotValid("min 6 char");
    if (values.mainName === "")
      errors.mainName = inputFieldNotValid("required");
    if (values.purchasePrice < 0 || values.purchasePrice === "")
      errors.purchasePrice = inputFieldNotValid("required");
    if (values.releaseYear === "")
      errors.releaseYear = inputFieldNotValid("required");
    if (values.purchaseDate === "")
      errors.purchaseDate = inputFieldNotValid("required");
    if (values.series === "") errors.series = inputFieldNotValid("required");
    if (values.weapon === "") errors.weapon = inputFieldNotValid("required");
    return errors;
  };

  // creating list of years
  export const yearsList = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1999; i--) yearsList.push(i);
