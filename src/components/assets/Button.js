function Button({ onClick, children, cssClass }) {
  return (
    <button onClick={onClick} className={cssClass}>
      {children}
    </button>
  );
}

export default Button;
