import "../css/modal.css";
import Button from "./Button";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";

function ConfirmModal({ figure, onClose, onClick }) {
  return (
    <div className="confirm-modal-wrapper">
      <div className="confirm-modal-container-inner">
        <div className="confirm-modal-container background-color-bg">
          <p className="confirm-modal-grid-line color-error">Delete?</p>
          <p className="confirm-modal-grid-line">{figure}</p>
          <div className="justify-self-end">
            <Button cssClass="btn btn-delete" onClick={onClick}>
            <BsFillHandThumbsUpFill className="btn-icon font-size-1-8" />
              yes
            </Button>
          </div>
          <div className="justify-self-start">
            <Button cssClass="btn btn-add" onClick={onClose}>
            <BsFillHandThumbsDownFill className="btn-icon font-size-1-8" />
              no
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
