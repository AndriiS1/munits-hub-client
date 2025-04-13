import { useCallback, useEffect, useState } from "react";
import { ReactComponent as FolderIcon } from "../../Assets/folder.icon.svg";
import objectsServiceInstance from "../../Services/Objects/objects.api.service";
import {
  FolderResponse,
  ObjectResponse,
} from "../../Services/Objects/objects.types";
import Button from "../Button/button.component";
import UploadArea from "../UploadArea/uploadArea.components";
import "./bucketContent.style.css";

function BucketContent(props: { bucketName: string; bucketId: string }) {
  const [path, setPath] = useState<string>("/");
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [objects, setObjects] = useState<ObjectResponse[]>([]);
  const [uploadFormIsOpened, setUploadFormIsOpened] = useState<boolean>(false);

  const truncateToDeepestPath = useCallback((path: string) => {
    const parts = path.split("/").filter(Boolean);
    const deepest = parts[parts.length - 1] || "";
    return `${deepest}/`;
  }, []);

  const fetchObjects = useCallback(async () => {
    if (!props.bucketId) {
      return;
    }

    console.log("fetchObjects", path);

    try {
      const objects = await objectsServiceInstance.GetObjects(
        props.bucketId,
        path
      );

      setFolders(objects.folders);
      setObjects(objects.objects);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  }, [props.bucketId, path]);

  useEffect(() => {
    fetchObjects();
  }, [fetchObjects]);

  const getFolderRow = (folder: FolderResponse) => {
    return (
      <tr key={folder.id}>
        <th
          scope="row"
          className="folder-title"
          onClick={() => setPath(`${path}${folder.prefix}/`)}
        >
          <FolderIcon className="folder-icon" />
          <span className="custom-link">
            {truncateToDeepestPath(folder.prefix)}
          </span>
        </th>
        <td className="data-cell">Folder</td>
      </tr>
    );
  };

  const getBreadcrumbs = () => {
    const parts = path.split("/").filter(Boolean);
    const breadcrumbs = parts.map((part, index) => {
      const path = parts.slice(0, index + 1).join("/ ");
      return (
        <>
          <span className="custom-link" onClick={() => setPath(`/${path}/`)}>
            {part}
          </span>
          <span> / </span>
        </>
      );
    });

    return (
      <div className="breadcrumbs">
        <span className="custom-link" key="/" onClick={() => setPath("/")}>
          {props.bucketName}
        </span>
        <span> / </span>
        {breadcrumbs}
      </div>
    );
  };

  const getObjectRow = (bucket: ObjectResponse) => {
    return (
      <tr key={bucket.id}>
        <th scope="row">
          <span className="custom-link">{bucket.fileName}</span>
        </th>
        <td className="data-cell">Object</td>
      </tr>
    );
  };

  return (
    <div className="bucket-content-wrapper">
      <div className="navigation">
        {getBreadcrumbs()}
        <div className="options">
          <Button text="Refresh" onClick={() => fetchObjects()} />
          <Button
            text="Upload"
            onClick={() => setUploadFormIsOpened(!uploadFormIsOpened)}
          />
        </div>
      </div>
      {uploadFormIsOpened && props.bucketName && (
        <UploadArea
          bucketId={props.bucketId}
          bucketName={props.bucketName}
          pathPlaceholder={path}
        />
      )}
      <table className="content-table">
        <thead>
          <tr>
            <th scope="col">Objects</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {folders.map((folder) => getFolderRow(folder))}
          {objects.map((object) => getObjectRow(object))}
        </tbody>
      </table>
    </div>
  );
}

export default BucketContent;
