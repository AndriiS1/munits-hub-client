import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import objectsServiceInstance from "../../Services/Objects/objects.api.service";
import { GetObjectResponse } from "../../Services/Objects/objects.types";
import "./object.style.css";

function ObjectPage() {
  const { bucketName } = useParams();
  const location = useLocation();

  const fileKey = decodeURIComponent(
    location.pathname.split(`/buckets/${bucketName}/`)[1] || ""
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [buckets, setBuckets] = useState<GetObjectResponse>();

  const fetchObject = useCallback(async () => {
    if (bucketName) {
      const objectResponse = await objectsServiceInstance.GetObject(
        bucketName,
        fileKey
      );
      console.log(objectResponse);
      setBuckets(objectResponse);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchObject();
  }, [fetchObject]);

  return <div className="object-data-wrapper"></div>;
}

export default ObjectPage;
