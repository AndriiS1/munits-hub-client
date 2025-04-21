import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import objectsServiceInstance from "../../Services/Objects/objects.api.service";
import {
  GetObjectResponse,
  ObjectResponse,
} from "../../Services/Objects/objects.types";
import { GetSizeString, TruncateContentType } from "../../Utils/fileSize.util";
import "./object.style.css";

function ObjectPage() {
  const { bucketName, objectId } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [objectData, setObjectData] = useState<GetObjectResponse>();
  const [selectedVersion, setSelectedVersion] = useState<
    ObjectResponse | undefined
  >();

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
  }, []);

  useEffect(() => {
    fetchObject();
  }, [fetchObject]);

  const details = (
    <div className="details">
      <table className="details-table">
        <thead>
          <tr>
            <th scope="col">Created at</th>
            <th scope="col">Version initiated at</th>
            <th scope="col">Content type</th>
            <th scope="col">Size</th>
            <th scope="col">Status</th>
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
        <>No custom metadata attached.</>
      )}
    </div>
  );

  const tags = (
    <div className="tags">
      {selectedVersion?.tags && Object.keys(selectedVersion.tags).length > 0 ? (
        <></>
      ) : (
        <>No tags attached.</>
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
          <h1>Versions</h1>
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
