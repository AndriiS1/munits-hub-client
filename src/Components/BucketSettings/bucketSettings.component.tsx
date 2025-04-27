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
        text={`To delete this bucket, please type '${props.bucketName}' to confirm.`}
        onDelete={deleteBucket}
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
      />
      <div className="bucket-settings">
        <Button color="red" onClick={() => setDeleteModalIsOpen(true)}>
          Delete bucket
        </Button>
      </div>
    </div>
  );
}

export default BucketSettings;
