
function fetchFigureInfo(figureNumber) {
  console.log("figureNumber=", figureNumber);
  const OAuth = require("oauth-1.0a")
//   const OAuth = require("oauth");

//   const { Parser } = require("json2csv");
  //  fs to częśc node.js pozwala działać na plikach
  //   const fs = require("fs");

  const ConsumerKey = "636AAA42B8894372873941C792A678F2";
  const ConsumerSecret = "08BB0A38BB9745A4B10531446D38BACC";
  const TokenValue = "797302A26E1640DD93C2EA133D458909";
  const TokenSecret = "38281AFEBAD6470483053D0D38A83528";
  const BASE_URL = "https://api.bricklink.com/api/store/v1";

  const oauth = new OAuth.OAuth(
    "",
    "",
    ConsumerKey,
    ConsumerSecret,
    "1.0",
    null,
    "HMAC-SHA1"
  );

  oauth.get(
    `${BASE_URL}/items/MINIFIG/${figureNumber}`,
    TokenValue,
    TokenSecret,
    function (error, data, res) {
      if (error) console.error(error);

      console.log(data);
      return data;
    }
  );
}

export default fetchFigureInfo;
