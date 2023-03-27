import FigureCard from "./FigureCard";

function FigureList({ figures, onDelete }) {
  const renderedFigures = figures.map(figure => {
    return <FigureCard onDelete={onDelete} key={figure.id} figure={figure} />;
  });

  return <div className="figure-container">{renderedFigures}</div>;
}

export default FigureList;
