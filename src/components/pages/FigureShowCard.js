import { useEffect, useState } from 'react';
import '../../css/figure-view.css';
import checkIfImageExist from '../../utils/checkIfImageExist';
import { GalacticRepublic } from '../../svg/GalacticRepublic';

function FigureCard({ figure, clickedImage, onModal, onEdit }) {
  const [state, setState] = useState('loading');
  const [figureImage, setFigureImage] = useState(
    `https://jaroslawkubiak.pl/portfolio/figures/static/media/bricklink.png`
  );

  useEffect(() => {
    // check if image link in DB is for bricklink or local
    if (figure.imageLink?.includes('https://jaroslawkubiak.pl')) {
      // set link from my server
      console.log('link jest z mojego serwera');
      setFigureImage(figure.imageLink);
      setState('succes');
    } else if (!figure.imageLink || figure.imageLink?.includes('https://img.bricklink.com')) {
      // set new default link
      console.log('link jest z pusty albo jest z bricklinka');
      setFigureImage(`https://img.bricklink.com/ItemImage/MN/0/${figure.number}.png`);

      //get api call - check if file exists on FTP
      checkIfImageExist(figure);
      setFigureImage(figure.imageLink);
      setState('succes');
    }
  }, []);

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
            src={figureImage}
            alt={figure.mainName}
            title={figure.mainName}
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
