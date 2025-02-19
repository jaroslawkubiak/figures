import { useEffect, useState } from 'react';
import '../../css/figure-view.css';
import checkIfImageExist from '../../utils/checkIfImageExist';
import parse from 'html-react-parser';

function FigureShowList({ figure, clickedImage, onModal, onEdit, isFigureEven }) {
  const [state, setState] = useState('loading');
  const [figureImage, setFigureImage] = useState(
    `https://jaroslawkubiak.pl/portfolio/figures/static/media/bricklink.png`
  );

  useEffect(() => {
    // check if image link in DB is for bricklink or local
    if (figure.imageLink?.includes('https://jaroslawkubiak.pl')) {
      // set link from my server
      setFigureImage(figure.imageLink);
      setState('succes');
    } else if (!figure.imageLink || figure.imageLink?.includes('https://img.bricklink.com')) {
      // set new default link
      setFigureImage(`https://img.bricklink.com/ItemImage/MN/0/${figure.number}.png`);

      //get api call - check if file exists on FTP
      // checkIfImageExist(figure);
      setFigureImage(figure.imageLink);
      setState('succes');
    }
  }, []);
  // set bricklink logo
  // const bricklinkLogo = 'public/bricklink.png';
  const bricklinkLogo = require(`../../bricklink.png`);

  const renderedData =
    parse(`<a href="https://www.bricklink.com/v2/catalog/catalogitem.page?M=${figure.number}" target="_blank">
  <img
          src=${bricklinkLogo}
          alt="Bricklink catalog"
          title="Bricklink catalog"
          className="r2d2-bricklink-logo-img"
        />
  </a>`);

  return (
    <div className={`r2d2-container ${isFigureEven || 'r2d2-even'}`}>
      <div
        className={`r2d2-figure-img-wrapper cursor-pointer ${isFigureEven || 'r2d2-even'}`}
        onClick={() => onModal(figure, clickedImage)}
      >
        <img src={figureImage} alt={figure.description} title={figure.description} className="r2d2-figure-img" />
      </div>

      <div
        className={`r2d2-wrapper font-size-0-8 ${isFigureEven || 'r2d2-even align-self-flex-end'} ${
          !isFigureEven || 'align-self-flex-start'
        }`}
      >
        <div
          className={`r2d2-item letter-spacing-2 cursor-pointer ${isFigureEven || 'text-align-right'}`}
          onClick={() => onEdit(figure)}
        >
          {figure.mainName}
        </div>
        <div className={`r2d2-item color-secondary ${isFigureEven || 'text-align-right'}`}>{figure.additionalName}</div>
        <div className={`r2d2-item color-secondary ${isFigureEven || 'text-align-right'}`}>
          {figure.number} - {figure.releaseYear}
        </div>
        <div className={`r2d2-item color-secondary ${isFigureEven || 'text-align-right'}`}>
          series : {figure.series}
        </div>
        <div className={`r2d2-item color-secondary ${isFigureEven || 'text-align-right'}`}>
          purchase date : {figure.purchaseDate}
        </div>
      </div>
      <div className={`r2d2-price color-secondary ${isFigureEven || 'r2d2-even'}`}>
        <p>Price</p>
        <p>{figure.purchasePrice} zł</p>
      </div>

      <div className={`r2d2-bricklink-logo-wrapper ${isFigureEven || 'r2d2-even'}`}>{renderedData}</div>
    </div>
  );
}

export default FigureShowList;
