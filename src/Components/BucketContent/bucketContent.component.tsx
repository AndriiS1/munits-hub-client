import { useCallback, useEffect, useState } from "react";
import objectsServiceInstance from "../../Services/Objects/objects.service";
import {
  FolderResponse,
  ObjectResponse,
} from "../../Services/Objects/objects.types";
import Button from "../Button/button.component";
import UploadArea from "../UploadArea/uploadArea.components";
import "./bucketContent.style.css";

function BucketFolder(props: {
  bucketName: string | undefined;
  bucketId: string | undefined;
}) {
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
        <th scope="row" onClick={() => setPath(folder.prefix)}>
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
          <span
            key={index}
            className="custom-link"
            onClick={() => setPath(`/${path}/`)}
          >
            {part}
          </span>
          <span> / </span>
        </>
      );
    });

    return (
      <div className="bucket-breadcrumbs">
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
    <div className="bucket-content">
      <div className="bucket-content-navigation">
        {getBreadcrumbs()}
        <div className="bucket-content-options">
          <Button text="Refresh" />
          <Button
            text="Upload"
            onClick={() => setUploadFormIsOpened(!uploadFormIsOpened)}
          />
        </div>
      </div>
      {uploadFormIsOpened && <UploadArea pathPlaceholder={path} />}
      <table className="bucket-content-table">
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

export default BucketFolder;
