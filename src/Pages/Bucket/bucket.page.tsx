import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BucketContent from "../../Components/BucketContent/bucketContent.component";
import Button from "../../Components/Button/button.component";
import SearchInput from "../../Components/SearchInput/searchInput.component";
import bucketServiceInstance from "../../Services/Buckets/buckets.api.service";
import { BucketResponse } from "../../Services/Buckets/buckets.types";

import { GetSizeString } from "../../Utils/fileSize.util";
import "./bucket.style.css";

function Bucket() {
  const { bucketName } = useParams();

  const navigate = useNavigate();

  const [bucketData, setBucketData] = useState<BucketResponse>();

  const fetchBucket = useCallback(async () => {
    if (!bucketName) {
      navigate("/buckets");
      return;
    }

    setBucketData(await bucketServiceInstance.GetBucketByName(bucketName));
  }, []);

  useEffect(() => {
    fetchBucket();
  }, [fetchBucket]);

  return (
    <div className="bucket-data-wrapper">
      <div>
        <Link to="/buckets" className="link">
          🠔 MunitS / {bucketName}
        </Link>
        <h1>{bucketName}</h1>
      </div>

      <div className="bucket-data">
        <table className="bucket-data-table">
          <thead>
            <tr>
              <th scope="col">Objects count</th>
              <th scope="col">Size</th>
              <th scope="col">Versioning enabled</th>
              {bucketData?.versioningEnabled ?? (
                <th scope="col">Versions limit</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bucketData?.objectsCount}</td>
              <td>{bucketData ? GetSizeString(bucketData.size) : 0}</td>
              <td>{bucketData?.versioningEnabled ? "Yes" : "No"}</td>
              {bucketData?.versioningEnabled ?? (
                <td>{bucketData?.versionsLimit}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      <hr />
      <div className="bucket-options">
        <SearchInput placeholder="Search for objects" />
        <div className="search-objects-button">
          <Button text="Search"></Button>
        </div>
      </div>

      <hr />
      {bucketName && bucketData?.id && (
        <BucketContent
          bucketName={bucketName}
          bucketId={bucketData?.id}
        ></BucketContent>
      )}
    </div>
  );
}

export default Bucket;
