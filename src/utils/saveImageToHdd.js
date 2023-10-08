import { saveAs } from "file-saver";
// saving image to your local disk
function saveImageToHdd(number) {
  let url = `https://img.bricklink.com/ItemImage/MN/0/${number}.png`;
  saveAs(url, number);
}
export default saveImageToHdd;
