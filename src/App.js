import "./index.css";
import "./fonts/star_wars.ttf";
import { useState } from "react";
import FigureList from "./components/FigureList";
// import Filters from "./components/Filters";
import FigureAdd from "./components/FigureAdd";
import Button from "./components/Button";

function App() {
  const temp = [
    {
      id: "429",
      series: "Rogue One",
      number: "sw0071",
      releaseYear: 2016,
      mainName: "Jabba",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 25,
      priceBL: 21.84,
      purchaseDate: "22-01-2022",
    },
    {
      id: "428",
      series: "The Mandalorian",
      number: "sw75005",
      releaseYear: 2021,
      mainName: "Rancor",
      additionalName: "Red Christmas Scarf",
      label: "tak",
      weapon: "Nie posiada",
      price: 40,
      priceBL: 30.74,
      purchaseDate: "21-01-2022",
    },
    {
      id: "427",
      series: "The Mandalorian",
      number: "sw1173",
      releaseYear: 2021,
      mainName: "Grogu",
      additionalName: "Christmas Sweater ",
      label: "tak",
      weapon: "Nie posiada",
      price: 40,
      priceBL: 32.44,
      purchaseDate: "21-01-2022",
    },
    {
      id: "426",
      series: "Clone Wars",
      number: "sw0109",
      releaseYear: 2011,
      mainName: "stormtrooper",
      additionalName: "",
      label: "tak",
      weapon: "Nie posiada",
      price: 50,
      priceBL: 72.64,
      purchaseDate: "21-01-2022",
    },
    {
      id: "425",
      series: "Episode 4/5/6",
      number: "sw75228",
      releaseYear: 2021,
      mainName: "dewback",
      additionalName: "Female",
      label: "tak",
      weapon: "Tak - mam",
      price: 15,
      priceBL: 41.49,
      purchaseDate: "15-01-2022",
    },
    {
      id: "424",
      series: "The Mandalorian",
      number: "sw1166",
      releaseYear: 2021,
      mainName: "The Mandalorian",
      additionalName: "Jet Pack",
      label: "tak",
      weapon: "Tak - mam",
      price: 25,
      priceBL: 32.06,
      purchaseDate: "15-01-2022",
    },
    {
      id: "423",
      series: "Episode 3",
      number: "sw0536",
      releaseYear: 2014,
      mainName: "Neimoidian Warrior",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 49,
      priceBL: 41.46,
      purchaseDate: "13-01-2022",
    },
    {
      id: "422",
      series: "Rebels",
      number: "sw0574a",
      releaseYear: 2014,
      mainName: "Ezra Bridger",
      additionalName: "with Helmet",
      label: "tak",
      weapon: "Tak - mam",
      price: 44,
      priceBL: 91.7,
      purchaseDate: "13-01-2022",
    },
    {
      id: "421",
      series: "Episode 4/5/6",
      number: "sw1136",
      releaseYear: 2021,
      mainName: "NI-L8",
      additionalName: "Protocol Droid",
      label: "tak",
      weapon: "Nie posiada",
      price: 30,
      priceBL: 21.43,
      purchaseDate: "12-01-2022",
    },
    {
      id: "420",
      series: "Episode 4/5/6",
      number: "sw1127",
      releaseYear: 2020,
      mainName: "Garindan",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 100,
      priceBL: 110.52,
      purchaseDate: "06-01-2022",
    },
    {
      id: "419",
      series: "Episode 4/5/6",
      number: "sw1129",
      releaseYear: 2020,
      mainName: "Kabe",
      additionalName: "",
      label: "tak",
      weapon: "Nie posiada",
      price: 50,
      priceBL: 67.89,
      purchaseDate: "06-01-2022",
    },
    {
      id: "418",
      series: "Episode 4/5/6",
      number: "sw1124",
      releaseYear: 2020,
      mainName: "Ponda Baba",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 50,
      priceBL: 85.56,
      purchaseDate: "06-01-2022",
    },
    {
      id: "417",
      series: "Episode 4/5/6",
      number: "sw1041",
      releaseYear: 2019,
      mainName: "Gonk Droid",
      additionalName: "Dark Turquoise",
      label: "tak",
      weapon: "Nie posiada",
      price: 30,
      priceBL: 30.93,
      purchaseDate: "22-12-2021",
    },
    {
      id: "416",
      series: "The Bad Batch",
      number: "sw1149",
      releaseYear: 2021,
      mainName: "Wrecker",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 69,
      priceBL: 55.93,
      purchaseDate: "16-12-2021",
    },
    {
      id: "415",
      series: "The Bad Batch",
      number: "sw1150",
      releaseYear: 2021,
      mainName: "Tech",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 69,
      priceBL: 56.62,
      purchaseDate: "16-12-2021",
    },
    {
      id: "414",
      series: "The Bad Batch",
      number: "sw1148",
      releaseYear: 2021,
      mainName: "Hunter",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 69,
      priceBL: 50.4,
      purchaseDate: "16-12-2021",
    },
    {
      id: "412",
      series: "The Bad Batch",
      number: "sw1151",
      releaseYear: 2021,
      mainName: "Echo",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 69,
      priceBL: 54.3,
      purchaseDate: "16-12-2021",
    },
    {
      id: "411",
      series: "The Bad Batch",
      number: "sw1152",
      releaseYear: 2021,
      mainName: "Crosshair",
      additionalName: "",
      label: "tak",
      weapon: "Tak - mam",
      price: 69,
      priceBL: 56.66,
      purchaseDate: "16-12-2021",
    },
    {
      id: "410",
      series: "The Bad Batch",
      number: "sw1153",
      releaseYear: 2021,
      mainName: "Gonk Droid",
      additionalName: "GNK Power Droid",
      label: "tak",
      weapon: "Nie posiada",
      price: 12,
      priceBL: 11.21,
      purchaseDate: "16-12-2021",
    },
    {
      id: "409",
      series: "Clone Wars",
      number: "sw1096",
      releaseYear: 2021,
      mainName: "Ahsoka Tano (Adult)",
      additionalName: "Dark Blue Jumpsuit",
      label: "tak",
      weapon: "Tak - mam",
      price: 50,
      priceBL: 34.37,
      purchaseDate: "03-12-2021",
    },
  ];

  const [figures, setFigures] = useState(temp);
  const [showFigureAdd, setShowFigureAdd] = useState(true);

  const deleteFigureById = id => {
    const updatedFigures = figures.filter(figure => {
      return figure.id !== id;
    });

    setFigures(updatedFigures);
  };

  const handleAddFigure = figure => {
    const updatedFigures = [figure, ...figures];
    setFigures(updatedFigures);
    // console.log(updatedFigures);
  };

  const handleClick = () => setShowFigureAdd(true);
  const handleClose = () => setShowFigureAdd(false);

  const FigureAddComponent = (
    <FigureAdd onSubmit={handleAddFigure} onClose={handleClose} />
  );

  return (
    <>
      {/* <Filters /> */}
      <Button onClick={handleClick}>add figure</Button>
      {showFigureAdd && FigureAddComponent}
      Ilość figurek : {figures.length}
      <FigureList onDelete={deleteFigureById} figures={figures} />
    </>
  );
}

export default App;

//"homepage": "https://zurawickidesign.pl/figures/",
