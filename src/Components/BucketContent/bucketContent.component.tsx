import { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as FolderIcon } from "../../Assets/folder.icon.svg";
import objectsServiceInstance from "../../Services/Objects/objects.api.service";
import {
  GetObjectsResponse,
  ObjectSuffixesCursor,
  ObjectSuffixResponse,
} from "../../Services/Objects/objects.types";
import { TruncateContentType } from "../../Utils/fileSize.util";
import Button from "../Button/button.component";
import UploadArea from "../UploadArea/uploadArea.components";
import "./bucketContent.style.css";

function BucketContent(props: { bucketName: string; bucketId: string }) {
  const [path, setPath] = useState<string>("/");
  const currentCursorRef = useRef<ObjectSuffixesCursor | undefined>(undefined);
  const [objectsResponse, setObjectsResponse] = useState<GetObjectsResponse>();
  const [uploadFormIsOpened, setUploadFormIsOpened] = useState<boolean>(false);

  const truncateToDeepestPath = useCallback((path: string) => {
    const parts = path.split("/").filter(Boolean);
    const deepest = parts[parts.length - 1] || "";
    return `${deepest}/`;
  }, []);

  const fetchObjects = useCallback(
    async (cursor?: ObjectSuffixesCursor | undefined) => {
      if (!props.bucketId) return;

      try {
        const response = await objectsServiceInstance.GetObjectSuffixes(
          props.bucketId,
          path,
          cursor,
          10
        );

        console.log("Fetched objects:", response);

        setObjectsResponse(response);
        currentCursorRef.current = response.nextCursor;
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    },
    [props.bucketId, path]
  );

  useEffect(() => {
    currentCursorRef.current = undefined;
    fetchObjects();
  }, [fetchObjects, path]);

  const handlePathChange = (newPath: string) => {
    setPath(newPath);
  };

  const getObjectSuffixRow = (objectSuffix: ObjectSuffixResponse) => {
    return (
      (objectSuffix.type === "Object" && (
        <>
          <tr key={objectSuffix.id}>
            <th scope="row">
              <span className="custom-link">{objectSuffix.suffix}</span>
            </th>
            <td className="data-cell">Object</td>
            <td className="data-cell">
              {TruncateContentType(objectSuffix.mimeType)}
            </td>
          </tr>
        </>
      )) ||
      (objectSuffix.type === "Directory" && (
        <>
          <tr key={objectSuffix.id}>
            <th
              scope="row"
              className="folder-title"
              onClick={() => {
                handlePathChange(`${path}${objectSuffix.suffix}/`);
              }}
            >
              <FolderIcon className="folder-icon" />
              <span className="custom-link">
                {truncateToDeepestPath(objectSuffix.suffix)}
              </span>
            </th>
            <td className="data-cell">Folder</td>

            <td className="data-cell">
              {TruncateContentType(objectSuffix.mimeType)}
            </td>
          </tr>
        </>
      ))
    );
  };

  const getBreadcrumbs = () => {
    const parts = path.split("/").filter(Boolean);
    const breadcrumbs = parts.map((part, index) => {
      const path = parts.slice(0, index + 1).join("/ ");
      return (
        <>
          <span
            className="custom-link"
            onClick={() => handlePathChange(`/${path}/`)}
          >
            {part}
          </span>
          <span> / </span>
        </>
      );
    });

    return (
      <div className="breadcrumbs">
        <span
          className="custom-link"
          key="/"
          onClick={() => handlePathChange("/")}
        >
          {props.bucketName}
        </span>
        <span> / </span>
        {breadcrumbs}
      </div>
    );
  };

  return (
    <div className="bucket-content-wrapper">
      <div className="navigation">
        {getBreadcrumbs()}
        <div className="options">
          <Button onClick={() => fetchObjects()}>Refresh</Button>
          <Button onClick={() => setUploadFormIsOpened(!uploadFormIsOpened)}>
            Upload
          </Button>
        </div>
      </div>
      {uploadFormIsOpened && props.bucketName && (
        <UploadArea
          bucketId={props.bucketId}
          bucketName={props.bucketName}
          pathPlaceholder={path}
          setIsOpen={setUploadFormIsOpened}
          onRefresh={() => fetchObjects()}
        />
      )}
      <table className="content-table">
        <thead>
          <tr>
            <th scope="col">Objects</th>
            <th scope="col">Storage class</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {objectsResponse?.objectSuffixes.map((objectSuffix) =>
            getObjectSuffixRow(objectSuffix)
          )}
        </tbody>
      </table>

      <div className="objects-pagination">
        {objectsResponse?.hasNext && (
          <Button onClick={() => fetchObjects(currentCursorRef.current)}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default BucketContent;
