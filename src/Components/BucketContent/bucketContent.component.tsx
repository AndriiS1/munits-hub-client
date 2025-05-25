import localizationService from "@/Localization/localization.service";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FolderIcon from "../../Assets/folder.icon";
import objectsServiceInstance from "../../Services/Objects/objects.api.service";
import type {
  GetObjectsResponse,
  ObjectSuffixesCursor,
  ObjectSuffixResponse,
} from "../../Services/Objects/objects.types";
import {
  nameTruncateLength,
  TruncateContentType,
  TruncateFileName,
  typeTruncateLength,
} from "../../Utils/fileSize.util";
import Button from "../Button/button.component";
import UploadArea from "../UploadArea/uploadArea.components";
import "./bucketContent.style.css";

function BucketContent(props: {
  bucketName: string;
  bucketId: string;
  fetchBucket: () => void;
}) {
  const [path, setPath] = useState<string>("/");
  const cursorsRef = useRef<(ObjectSuffixesCursor | undefined)[]>([]);
  const [objectsResponse, setObjectsResponse] = useState<GetObjectsResponse>();
  const [uploadFormIsOpened, setUploadFormIsOpened] = useState<boolean>(false);
  const [paginationIndex, setPaginationIndex] = useState(0);

  const navigate = useNavigate();
  const objectsLimit = 20;

  const fetchObjects = useCallback(
    async (
      cursor?: ObjectSuffixesCursor | undefined,
      indexDelta: number = 0
    ) => {
      if (!props.bucketId) return;

      try {
        console.log(cursorsRef.current);
        const response = await objectsServiceInstance.GetObjectSuffixes(
          props.bucketId,
          path,
          cursor,
          objectsLimit
        );
        setObjectsResponse(response);

        const existingIndex = cursorsRef.current.findIndex(
          (c) =>
            c?.suffix === response.nextCursor?.suffix &&
            c?.type === response.nextCursor?.type
        );

        if (existingIndex === -1 && response.nextCursor) {
          cursorsRef.current.push(response.nextCursor);
        }

        setPaginationIndex((prev) => prev + indexDelta);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    },
    [props.bucketId, path]
  );

  useEffect(() => {
    fetchObjects();
  }, [fetchObjects, path]);

  const handlePathChange = (newPath: string) => {
    setPath(newPath);
  };

  const getObjectSuffixRow = (objectSuffix: ObjectSuffixResponse) => {
    const isObject = objectSuffix.type === "Object";
    const isDirectory = objectSuffix.type === "Directory";

    const handleRowClick = () => {
      if (isObject) {
        navigate(`objects/${objectSuffix.id}`);
      } else if (isDirectory) {
        handlePathChange(`${path}${objectSuffix.suffix}/`);
      }
    };

    return (
      <tr key={objectSuffix.id}>
        <th
          scope="row"
          className={isDirectory ? "folder-title" : ""}
          onClick={handleRowClick}
        >
          {isDirectory && <FolderIcon className="folder-icon" />}
          <span
            className="custom-link"
            title={
              objectSuffix.suffix.length > nameTruncateLength
                ? objectSuffix.suffix
                : undefined
            }
          >
            {TruncateFileName(objectSuffix.suffix) + (isDirectory ? " /" : "")}
          </span>
        </th>
        <td className="data-cell">
          {isObject
            ? localizationService.translate("object")
            : localizationService.translate("folder")}
        </td>
        <td
          className="data-cell"
          title={
            objectSuffix.mimeType.length > typeTruncateLength
              ? objectSuffix.mimeType
              : undefined
          }
        >
          {TruncateContentType(objectSuffix.mimeType)}
        </td>
      </tr>
    );
  };

  const getBreadcrumbs = () => {
    const parts = path.split("/").filter(Boolean);
    const breadcrumbs = parts.map((part, index) => {
      const path = parts.slice(0, index + 1).join("/ ");
      return (
        <div key={path}>
          <span
            className="custom-link"
            onClick={() => handlePathChange(`/${path}/`)}
          >
            {part}
          </span>
          <span> / </span>
        </div>
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
          <Button onClick={() => fetchObjects()}>
            {localizationService.translate("refresh")}
          </Button>
          <Button onClick={() => setUploadFormIsOpened(!uploadFormIsOpened)}>
            {localizationService.translate("upload")}
          </Button>
        </div>
      </div>
      {uploadFormIsOpened && props.bucketName && (
        <UploadArea
          bucketId={props.bucketId}
          bucketName={props.bucketName}
          pathPlaceholder={path.replace(/^\/|\/$/g, "").trim()}
          setIsOpen={setUploadFormIsOpened}
          onRefresh={() => {
            fetchObjects();
            props.fetchBucket();
          }}
        />
      )}
      {objectsResponse?.objectSuffixes.length === 0 ? (
        <div className="no-objects">
          {localizationService.translate("no_objects_found")}
        </div>
      ) : (
        <div className="content-table-wrapper">
          <table className="content-table">
            <thead>
              <tr>
                <th scope="col">{localizationService.translate("objects")}</th>
                <th scope="col">
                  {localizationService.translate("storage_class")}
                </th>
                <th scope="col">{localizationService.translate("type")}</th>
              </tr>
            </thead>
            <tbody>
              {objectsResponse?.objectSuffixes.map((objectSuffix) =>
                getObjectSuffixRow(objectSuffix)
              )}
            </tbody>
          </table>
          {(objectsResponse?.hasNext || paginationIndex > 0) && (
            <div className="objects-pagination">
              <Button
                disabled={paginationIndex === 0}
                onClick={() => {
                  const prevCursor = cursorsRef.current[paginationIndex - 2];
                  fetchObjects(prevCursor, -1);
                }}
              >
                &lt; {localizationService.translate("previous")}
              </Button>

              <Button
                disabled={!objectsResponse?.hasNext}
                onClick={() => {
                  const nextCursor = cursorsRef.current[paginationIndex];
                  fetchObjects(nextCursor, 1);
                }}
              >
                {localizationService.translate("next")}
                &gt;
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BucketContent;
