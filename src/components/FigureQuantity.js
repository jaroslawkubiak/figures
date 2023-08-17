import {
  BsFill1SquareFill,
  BsFill2SquareFill,
  BsFill3SquareFill,
  BsFill4SquareFill,
  BsFill5SquareFill,
  BsFill6SquareFill,
  BsFill7SquareFill,
  BsFill8SquareFill,
  BsFill9SquareFill,
  BsFill0SquareFill,
} from "react-icons/bs";

function FigureQuantity({ quantity, fillColor }) {
  const stringQuantity = [...String(quantity)];
  const renderedQuantity = stringQuantity.map((char, index) => {
    switch (char) {
      case "0":
        return <BsFill0SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "1":
        return <BsFill1SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "2":
        return <BsFill2SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "3":
        return <BsFill3SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "4":
        return <BsFill4SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "5":
        return <BsFill5SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "6":
        return <BsFill6SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "7":
        return <BsFill7SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "8":
        return <BsFill8SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      case "9":
        return <BsFill9SquareFill key={index} fill={fillColor} className="filter-quantity-icon" />;
      default:
        return null;
    }
  });
  return <>{renderedQuantity}</>;
}
export default FigureQuantity;
