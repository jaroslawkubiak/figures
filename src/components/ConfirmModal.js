import "../css/modal.css";
import Button from "./Button";

function ConfirmModal({ figure, onClose, onClick }) {
  return (
    <div className="confirm-modal-wrapper">
      <div className="confirm-modal-container background-color-bg">
        <p className="color-error">Delete?</p>
        <p>{figure}</p>
        <div className="grid-row">
          <Button cssClass="button-delete" onClick={onClick}>
            yes
          </Button>
          <Button cssClass="button" onClick={onClose}>
            no
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
