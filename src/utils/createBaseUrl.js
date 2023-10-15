function createBaseUrl() {
  return process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_PRODUCTION_URL}/`
    : `${process.env.REACT_APP_DEVELOPMENT_URL}:${process.env.REACT_APP_DEVELOPMENT_PORT}/`;
}
export default createBaseUrl;
