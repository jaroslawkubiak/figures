// error message for validating inputs
export const inputFieldNotValid = message => {
  return (
    <div className="required-field-container">
      <div className="required-field">{message}</div>
      <div className="required-field-after"></div>
    </div>
  );
};

const REQUIRED_FIELD_MESSAGE = 'Required';
// regex for validating only float input, only 2 digit after , or .
export const onlyNumbersRegex = /^-?\d*(?:[.,]\d{0,2})?$/;

// form validate
export function validate(values, isSubmit, duplicate) {
  const errors = {};
  if (duplicate) {
    errors.number = inputFieldNotValid('You have this');
  }
  if (isSubmit && values.number.length < 6) errors.number = inputFieldNotValid('Min 6 char');
  if (isSubmit && values.mainName === '') errors.mainName = inputFieldNotValid(REQUIRED_FIELD_MESSAGE);

  // if (isSubmit && (values.purchasePrice < 0 || values.purchasePrice === ''))
  //   errors.purchasePrice = inputFieldNotValid(REQUIRED_FIELD_MESSAGE);
  if (isSubmit && values.releaseYear === '') errors.releaseYear = inputFieldNotValid(REQUIRED_FIELD_MESSAGE);
  if (isSubmit && values.purchaseDate === '') errors.purchaseDate = inputFieldNotValid(REQUIRED_FIELD_MESSAGE);
  if (isSubmit && values.series === '') errors.series = inputFieldNotValid(REQUIRED_FIELD_MESSAGE);
  // if (isSubmit && values.weapon === '') errors.weapon = inputFieldNotValid(REQUIRED_FIELD_MESSAGE);
  return errors;
}
// to be able save price in db i have to change , to .
export const changePeriodToComma = val => val.replace(',', '.');
