import "../css/figure-card.css";

// FIXME - przeniesc do edycji figurki
function FigureCard({ figure, onDelete }) {
  const handleClick = () => {
    onDelete(figure.id);
  };

  const img = (
    <img
      src={require("../images_minifigure/" + figure.number + ".png")}
      alt={figure.mainName}
      id={figure.id}
      className="figure-img"
    />
  );

  // console.log(document.getElementById(figure.id));

  return (
    <div className="container">
      <div className="name">
        <span className="cell-text">{figure.mainName}</span>
      </div>
      <div className="wrapper">{img}</div>
      <div className="number">
        <span className="cell-text">
          {figure.number} - {figure.releaseYear}
        </span>
      </div>
    </div>

    // <div className="card-wrapper">
    //   <div className="cell">
    //     {figure.number} - {figure.releaseYear}
    //   </div>
    //   <div className="cell">{figure.mainName}</div>
    //   {img}

    //   <div className="cell " onClick={handleClick}>
    //     usuń
    //   </div>
    // </div>
  );
}

export default FigureCard;
