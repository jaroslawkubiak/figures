import { useEffect, useState } from 'react';
import '../../css/figure-view.css';
import showFigureImage from '../../utils/showFigureImage';
import { GalacticRepublic } from '../../svg/GalacticRepublic';

function FigureCard({ figure, clickedImage, onModal, onEdit }) {
  const defaultImage = {
    defaultUrl: 'https://jaroslawkubiak.pl/portfolio/figures/static/media/bricklink.png',
    url: `https://jaroslawkubiak.pl/portfolio/figures/static/media/${figure.number}.png`,
    description: figure.mainName,
  };

  
  const [figureImage, setFigureImage] = useState(defaultImage);
  const [state, setState] = useState('succes');

  useEffect(() => {
    setState('loading');
    showFigureImage(figure)
      .then(value => {
        setState('succes');
        setFigureImage(value);
      })
      .catch(err => {
        setState('error');
        console.log(err);
      });
  }, [figure]);


  return (
    <div className="card-container">
      <div className="card-name">
        <span
          className="card-cell-text cursor-pointer color-r2d2-primary text-underline"
          figure={figure}
          onClick={() => onEdit(figure)}
        >
          {figure.mainName}
        </span>
      </div>
      <div className="card-wrapper cursor-pointer" onClick={() => onModal(figure, clickedImage)}>
        {state === 'loading' ? (
          <GalacticRepublic cssClass="svg-fill-loading svg-rotate" />
        ) : state === 'error' ? (
          <GalacticRepublic cssClass="svg-fill-error" />
        ) : (
          <img
            src={figureImage.url ? figureImage.url : figureImage.defaultUrl}
            alt={figureImage.description}
            title={figureImage.description}
            className="card-figure-img cursor-pointer"
          />
        )}
      </div>
      <div className="card-number">
        <span className="card-cell-text">
          {figure.number} - {figure.releaseYear}
        </span>
      </div>
    </div>
  );
}

export default FigureCard;
