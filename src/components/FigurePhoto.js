import React from "react";
import {saveAs} from "file-saver";

function FigurePhoto({ figNumber }) {
  //   console.log("numer fig:", figNumber);

  let renderedPhoto = (
    <img
      src="./bricklink.png"
      alt="img"
    />
  );
  if (figNumber.length >= 6) {
    const photoUrl = `https://www.bricklink.com/v2/catalog/catalogitem.page?M=${figNumber}`;
    renderedPhoto = `<img src="${photoUrl}" alt="img" />`;
  }

  console.log("renderedPhoto:", renderedPhoto);

  return <div>{renderedPhoto}</div>;


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
