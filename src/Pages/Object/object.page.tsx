import localizationService from "@/Localization/localization.service";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/Button/button.component";
import objectsServiceInstance from "../../Services/Objects/objects.api.service";
import type {
  GetObjectResponse,
  ObjectResponse,
} from "../../Services/Objects/objects.types";
import { GetSizeString, TruncateContentType } from "../../Utils/fileSize.util";
import Modal from "./Modal/modal.component";
import "./object.style.css";

function ObjectPage() {
  const { bucketName, objectId } = useParams();

  const [, setLoading] = useState<boolean>(true);
  const [objectData, setObjectData] = useState<GetObjectResponse>();
  const [selectedVersion, setSelectedVersion] = useState<
    ObjectResponse | undefined
  >();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteObject = useCallback(() => {
    if (!objectData) return;

    objectsServiceInstance
      .Delete(objectData.bucketId, objectData.fileKey)
      .then(() => {
        setDeleteModalIsOpen(false);
        navigate(`/buckets/${bucketName}`);
      });
  }, [objectData, navigate, bucketName]);

  const fetchObject = useCallback(async () => {
    if (bucketName && objectId) {
      const objectResponse = await objectsServiceInstance.GetObject(
        bucketName,
        objectId
      );

      console.log(objectResponse);
      setObjectData(objectResponse);
      setSelectedVersion(objectResponse.versions.find(Boolean));
    }
    setLoading(false);
  }, [bucketName, objectId]);

  useEffect(() => {
    fetchObject();
  }, [fetchObject]);

  const details = (
    <div className="details">
      <table className="details-table">
        <thead>
          <tr>
            <th scope="col">{localizationService.translate("created_at")}</th>
            <th scope="col">
              {localizationService.translate("version_initiated_at")}
            </th>
            <th scope="col">{localizationService.translate("content_type")}</th>
            <th scope="col">{localizationService.translate("size")}</th>
            <th scope="col">{localizationService.translate("status")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {objectData && new Date(objectData.createdAt).toDateString()}
            </td>
            <td>
              {selectedVersion &&
                new Date(selectedVersion.initiatedAt).toDateString()}
            </td>
            <td title={selectedVersion?.mimeType}>
              {selectedVersion?.mimeType &&
                TruncateContentType(selectedVersion.mimeType)}
            </td>
            <td>
              {selectedVersion?.sizeInBytes &&
                GetSizeString(selectedVersion.sizeInBytes)}
            </td>
            <td>{selectedVersion?.uploadStatus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const metadata = (
    <div className="metadata">
      {selectedVersion?.customMetadata &&
      Object.keys(selectedVersion.customMetadata).length > 0 ? (
        <></>
      ) : (
        <>{localizationService.translate("no_custom_metadata_attached")}</>
      )}
    </div>
  );

  const tags = (
    <div className="tags">
      {selectedVersion?.tags && Object.keys(selectedVersion.tags).length > 0 ? (
        <></>
      ) : (
        <>{localizationService.translate("no_tags_attached")}</>
      )}
    </div>
  );

  const handleVersionChange = (uploadId: string) => {
    setSelectedVersion(
      objectData?.versions.find((version) => version.uploadId === uploadId)
    );
  };

  const versions = (
    <div className="versions-container">
      <div className="timeline-container">
        <div className="timeline">
          <h1>{localizationService.translate("versions")}</h1>
          <ul className="sessions">
            {objectData?.versions.map((version) => (
              <li key={version.uploadId}>
                <div
                  className={
                    selectedVersion?.uploadId === version.uploadId
                      ? "selected-version"
                      : "non-selected-version"
                  }
                  onClick={
                    selectedVersion?.uploadId === version.uploadId
                      ? undefined
                      : () => handleVersionChange(version.uploadId)
                  }
                >
                  <div className="time">
                    {new Date(version.initiatedAt).toDateString()}
                  </div>
                  <p>{version.uploadStatus}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="object-data-wrapper">
      <div>
        <Link to={`/buckets/${bucketName}`} className="link">
          🠔 MunitS / {bucketName}
        </Link>
        <h1>{objectData?.fileKey}</h1>
      </div>

      <hr />
      <Modal
        text="Confirm object deletion"
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={deleteObject}
      />
      <div className="object-options">
        <div className="options">
          <Button color="red" onClick={() => setDeleteModalIsOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      <div className="object-data">
        <div className="data">
          {details}
          <hr />
          {metadata}
          <hr />
          {tags}
        </div>
        {versions}
      </div>
    </div>
  );
}

export default ObjectPage;
