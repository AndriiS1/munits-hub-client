import localizationService from "@/Localization/localization.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bucketServiceInstance from "../../Services/Buckets/buckets.api.service";
import Button from "../Button/button.component";
import "./bucketSettings.style.css";
import ModalWithInput from "./Modal/modalWithInput.component";

function BucketSettings(props: { bucketName: string; bucketId: string }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteBucket = () => {
    bucketServiceInstance.Delete(props.bucketId).then(() => {
      setDeleteModalIsOpen(false);
      navigate("/buckets");
    });
  };

  return (
    <div className="bucket-settings-wrapper">
      <ModalWithInput
        bucketName={props.bucketName}
        text={`${localizationService.translate("to_delete_this_bucket")} '${
          props.bucketName
        }'`}
        onDelete={deleteBucket}
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
      />
      <div className="bucket-settings">
        <Button color="red" onClick={() => setDeleteModalIsOpen(true)}>
          {localizationService.translate("delete_bucket")}
        </Button>
      </div>
    </div>
  );
}

export default BucketSettings;
