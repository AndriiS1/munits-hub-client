import localizationService from "@/Localization/localization.service";
import Button from "../../../Components/Button/button.component";
import "./modal.style.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onDelete, text }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{text}</h2>
        <div className="modal-actions">
          <Button onClick={onClose}>
            {localizationService.translate("cancel")}
          </Button>
          <Button color="red" inverted={true} onClick={() => onDelete()}>
            {localizationService.translate("delete")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
