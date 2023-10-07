function splitName(name) {
  console.log('split name:', name);
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
    // console.log('1 newNames.main=', newNames.main);
    // console.log('1 newNames.additional=', newNames.additional);
  }

  // split by -
  if (!newNames.main) {
    const dash = name.indexOf(' - ');
    // console.log('2 dash=', dash);
    if (dash > 1) {
      newNames.main = name.slice(0, dash);
      const tempAdditionalName = name.slice(dash + 3);
      const comma = tempAdditionalName.indexOf(',');
      //   console.log('comma=', comma);
      //   console.log('temp=', tempAdditionalName);
      newNames.additional = tempAdditionalName.slice(0, comma);
      //   console.log('2 newNames.main=', newNames.main);
      //   console.log('2 newNames.additional=', newNames.additional);
    }
  }

  // split by ,
  if (!newNames.main) {
    const comma = name.indexOf(',');
    // console.log('3 comma =', comma);
    if (comma > 1) {
      newNames.main = name.slice(0, comma);
      newNames.additional = name.slice(comma + 2);
      //   console.log('3 newNames.main=', newNames.main);
      //   console.log('3 newNames.additional=', newNames.additional);
    }
  }

  // nothing to split
  if (!newNames.main) {
    // console.log('nothing to split');

    newNames.main = name;
  }

  //   console.log('FINAL newNames.main=', newNames.main);
  //   console.log('FINAL newNames.additional=', newNames.additional);

  return newNames;
}

export default splitName;

// Gonk Droid (GNK Power Droid), Sand Green

// Darth Vader - Printed Arms, Traditional Starched Fabric Cape

// 0247 Admiral Ackbar

// 0147 Astromech Droid, R1-G4
