import "../css/figure-add.css";

function Panel({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}

export default Panel;
