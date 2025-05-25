import localizationService from "@/Localization/localization.service";
import { useEffect, useState } from "react";
import Button from "../../Button/button.component";
import Input from "../../Input/input.component";
import "./modalWithInput.style.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (inputValue: string) => void;
  text: string;
  bucketName: string;
}

const ModalWithInput: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  text,
  bucketName,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue === bucketName) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValue, bucketName]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{text}</h2>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        ></Input>
        <div className="modal-actions">
          <Button onClick={onClose}>
            {" "}
            {localizationService.translate("cancel")}
          </Button>
          <Button
            disabled={isDisabled}
            color="red"
            inverted={true}
            onClick={() => onDelete(inputValue)}
          >
            {localizationService.translate("delete")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalWithInput;
