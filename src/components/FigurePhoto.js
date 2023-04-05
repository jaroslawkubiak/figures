import React, { useState } from "react";
import parse from "html-react-parser";
import { BsImage } from "react-icons/bs";
import { GalacticEmpire } from "../svg/GalacticEmpire";
import fetchFigureInfo from "../fetch/bricklink";

function FigurePhoto({ figNumber }) {
  //state for fetching img from bricklink server
  const [figImg, setFigImg] = useState({
    isLoading: false,
    error: null,
    result: "",
  });

  // check if image exists on server
  function imageExists(image_url) {
    const http = new XMLHttpRequest();
    http.open("HEAD", image_url, false);
    http.send();
    return http.status !== 404;
  }

  let renderedData = (
    <div className="flex-row">
      <BsImage className="font-size-6 svg-image-prev " />
      <span> &nbsp;</span>
    </div>
  );
  let renderedPhoto = `https://img.bricklink.com/ItemImage/MN/0/${figNumber}.png`;

  if (figNumber.length < 6 && figImg.result !== "") {
    setFigImg({ ...figImg, result: "" });
  }

  if (figNumber.length >= 6 && imageExists(renderedPhoto)) {
    if (!figImg.isLoading && figImg.result === "")
      setFigImg({ ...figImg, isLoading: true });
    renderedData = <GalacticEmpire height="100" width="100" />;

    let img = new Image();
    img.onload = () => {
      if (figImg.isLoading) {
        setFigImg({ ...figImg, isLoading: false, result: renderedPhoto });
        // fetching figure info from bricklink
        // fetchFigureInfo(figNumber);
      }
    };

    img.src = renderedPhoto;
    if (!figImg.isLoading && figImg.result !== "")
      renderedData =
        parse(`<a href="https://www.bricklink.com/v2/catalog/catalogitem.page?M=${figNumber}" target="_blank">
        <img id="add-img" class="cursor-pointer" src=${renderedPhoto} alt="${figNumber} image" />
        </a>`);
  }

  // image doesnt exists on server
  if (figNumber.length >= 6 && !imageExists(renderedPhoto)) {
    if (!figImg.error) setFigImg({ ...figImg, error: "Not found" });
    renderedData = (
      <div className="flex-row">
        <BsImage className="font-size-6 svg-image-prev-error " />
        <span className="svg-image-prev-error">Not found</span>
      </div>
    );
  }

  return (
    <>
      {renderedData}
    </>
  );
}
// https://www.bricklink.com/v2/catalog/catalogitem.page?M=sw1078

export default FigurePhoto;
