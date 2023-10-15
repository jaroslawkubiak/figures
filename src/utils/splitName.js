function splitName(name) {
  const newNames = {
    main: '',
    additional: '',
  };

  // split by ( ) ( &#40; ) &#41;
  const openBracket = name.indexOf('&#40');
  const closeBracket = name.indexOf('&#41');
  if (openBracket > 1 && closeBracket > 1) {
    newNames.main = name.slice(0, openBracket - 1);
    newNames.additional = name.slice(openBracket + 5, closeBracket);
  }

  // split by -
  if (!newNames.main) {
    const dash = name.indexOf(' - ');
    if (dash > 1) {
      newNames.main = name.slice(0, dash);
      const tempAdditionalName = name.slice(dash + 3);
      const comma = tempAdditionalName.indexOf(',');
      newNames.additional = tempAdditionalName.slice(0, comma);
    }
  }

  // split by ,
  if (!newNames.main) {
    const comma = name.indexOf(',');
    if (comma > 1) {
      newNames.main = name.slice(0, comma);
      newNames.additional = name.slice(comma + 2);
    }
  }

  // nothing to split
  if (!newNames.main) newNames.main = name;

  return newNames;
}

export default splitName;