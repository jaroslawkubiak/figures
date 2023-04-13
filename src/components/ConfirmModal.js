import "../css/modal.css";
import Button from "./Button";

function ConfirmModal({figure}) {
  console.log("this is modal");
  return (
    <div className="confirm-modal-wrapper">
      <div className="confirm-modal-container background-color-bg">
        <p className="color-darth">Delete</p>
        <p>{figure}</p>
        <div className="grid-row">
          <Button cssClass="button-delete ">yes</Button>
          <Button cssClass="button">no</Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
