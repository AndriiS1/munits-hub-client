import { useCallback, useEffect, useState } from "react";
import objectsServiceInstance from "../../Services/Objects/objects.service";
import {
  FolderResponse,
  ObjectResponse,
} from "../../Services/Objects/objects.types";
import "./bucketContent.style.css";

function BucketFolder(props: { bucketId: string | undefined }) {
  const [path, setPath] = useState<string>("/");
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [objects, setObjects] = useState<ObjectResponse[]>([]);

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

      console.log("objects", objects);
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
          className="data-header"
          onClick={() => setPath(folder.prefix)}
        >
          <span>{folder.prefix}</span>
        </th>
        <td className="data-cell">Folder</td>
      </tr>
    );
  };

  const getObjectRow = (bucket: ObjectResponse) => {
    return (
      <tr key={bucket.id}>
        <th scope="row" className="data-header">
          <span>{bucket.fileName}</span>
        </th>
        <td className="data-cell">Object</td>
      </tr>
    );
  };

  return (
    <div className="bucket-content">
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
