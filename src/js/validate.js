// validating functions
export const numberValidate = number => {
  console.log("sprawdzam  number:", number);
  return number.length >= 6;
};

export const purchasePriceValidate = price => {
  console.log("sprawdzam  purchasePrice:", price);
  return price > 0;
};

export const purchaseDateValidate = purchaseDate => {
  console.log("sprawdzam  purchaseDate:", purchaseDate);
  return purchaseDate !== "";
};

export const releaseYearValidate = releaseYear => {
  console.log("sprawdzam  releaseYear:", releaseYear);
  return releaseYear !== "";
};

export const seriesValidate = series => {
  console.log("sprawdzam  series:", series);
  return series !== "";
};

export const mainNameValidate = mainName => {
  console.log("sprawdzam  mainName:", mainName);
  return mainName !== "";
};

export const weaponValidate = weapon => {
  console.log("sprawdzam  weapon:", weapon);
  return weapon !== "";
};
