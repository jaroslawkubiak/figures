import React from "react";
import parse from "html-react-parser";
import { BsImage } from "react-icons/bs";
// import {saveAs} from "file-saver";

function FigurePhoto({ figNumber }) {
  // check if image exists on server
  function imageExists(image_url) {
    const http = new XMLHttpRequest();
    http.open("HEAD", image_url, false);
    http.send();
    return http.status !== 404;
  }

  let renderedData = <BsImage className="font-size-6 svg-image-prev" />;
  let renderedPhoto = `https://img.bricklink.com/ItemImage/MN/0/${figNumber}.png`;

  if (figNumber.length >= 6 && imageExists(renderedPhoto)) {
    let img = new Image();
    img.onload = () => {
      console.log(`img ${figNumber} loaded`);
    };
      img.src = renderedPhoto;

      renderedData =
        parse(`<a href="https://www.bricklink.com/v2/catalog/catalogitem.page?M=${figNumber}" target="_blank">
          <img id="add-img" class="cursor-pointer" src=${renderedPhoto} alt="${figNumber} image" />
        </a>`);
  }

  return <>{renderedData}</>;

  // saving img on local disk
  //   const handleClick = ()=>{
  //     let url = "https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
  //     saveAs(url, "Twitter-logo");
  //     saveAs(url, 'img.png', )
  //    }

  //    return (
  //      <div className="App">
  //          <button onClick={handleClick}>Dowload image</button>
  //      </div>
  //    );
}
// https://www.bricklink.com/v2/catalog/catalogitem.page?M=sw1078

export default FigurePhoto;
