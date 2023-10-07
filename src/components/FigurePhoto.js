import React, { useState } from 'react';
import parse from 'html-react-parser';
import { GalacticEmpire } from '../svg/GalacticEmpire';
// import fetchFigureInfo from "../fetch/bricklink";

function FigurePhoto({ figNumber, cssSvgFill }) {
  //state for fetching img from bricklink server
  const [figImg, setFigImg] = useState({
    isLoading: false,
    error: null,
    result: '',
  });

  // check if image exists on server
  function imageExists(image_url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status !== 404;
  }

  let renderedData = (
    <div className="img-wrapper">
      <span> &nbsp;</span>
      <GalacticEmpire cssClass={cssSvgFill} />
    </div>
  );
  let renderedPhoto = `https://img.bricklink.com/ItemImage/MN/0/${figNumber}.png`;

  if (figNumber.length < 6 && figImg.result !== '') {
    setFigImg({ ...figImg, result: '' });
  }

  if (figNumber.length >= 6 && imageExists(renderedPhoto)) {
    if (!figImg.isLoading && figImg.result === '') setFigImg({ ...figImg, isLoading: true });
    const cssSvgClass = `${cssSvgFill} svg-galactic-empire-rotate`;
    renderedData = (
      <div className="img-wrapper">
        <span className="color-error">&nbsp;</span>
        <GalacticEmpire cssClass={cssSvgClass} />
      </div>
    );

    let img = new Image();
    img.onload = () => {
      if (figImg.isLoading) {
        setFigImg({ ...figImg, isLoading: false, result: renderedPhoto });
        // fetching figure info from bricklink
        // fetchFigureInfo(figNumber);
      }
    };

    img.src = renderedPhoto;
    if (!figImg.isLoading && figImg.result !== '')
      renderedData =
        parse(`<a href="https://www.bricklink.com/v2/catalog/catalogitem.page?M=${figNumber}" target="_blank">
        <img id="add-img" class="cursor-pointer" src=${renderedPhoto} alt="${figNumber} image" />
        </a>`);
  }

  // image dont exists on server
  if (figNumber.length >= 6 && !imageExists(renderedPhoto)) {
    if (!figImg.error) setFigImg({ ...figImg, error: 'Not found' });
    renderedData = (
      <div className="img-wrapper">
        <span className="color-error">img not found</span>
        <GalacticEmpire cssClass="svg-fill-error" />
      </div>
    );
  }

  return <>{renderedData}</>;
}

export default FigurePhoto;
