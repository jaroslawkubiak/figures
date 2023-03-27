import FigureCard from "./FigureCard";

function FigureList({ figures }) {
  const renderedFigures = figures.map(figure => {
    return <FigureCard key={figure.id} figure={figure} />;
  });

  return <div className="figure-container">{renderedFigures}</div>;
}

export default FigureList;
