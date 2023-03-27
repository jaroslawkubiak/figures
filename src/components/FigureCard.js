import "../css/figure-card.css";


function FigureCard({ figure }) {
  return (
    <div className="card-wrapper">
      <div className="cell">
        {figure.number} - {figure.releaseYear}
      </div>
      <div className="cell">{figure.mainName}</div>
    </div>
  );
}

export default FigureCard;
