function createBaseUrl() {
  // return process.env.NODE_ENV === 'production'
  //   ? `${process.env.REACT_APP_PRODUCTION_URL}/`
  //   : `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}/`;

  let testURL;
  if (process.env.NODE_ENV === 'production') {
    testURL = `${process.env.REACT_APP_PRODUCTION_URL}/`;
  } else {
    testURL = `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}/`;
  }

  console.log(`BASE URL=${testURL}`);
  return testURL;
}
export default createBaseUrl;
