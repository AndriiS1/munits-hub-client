import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BucketContent from "../../Components/BucketContent/bucketContent.component";
import BucketSettings from "../../Components/BucketSettings/bucketSettings.component";
import bucketServiceInstance from "../../Services/Buckets/buckets.api.service";
import { BucketResponse } from "../../Services/Buckets/buckets.types";
import { GetSizeString } from "../../Utils/fileSize.util";
import "./bucket.style.css";

function Bucket() {
  const { bucketName } = useParams();
  const navigate = useNavigate();
  const [bucketData, setBucketData] = useState<BucketResponse>();
  const [option, setOptions] = useState<"objects" | "settings">("objects");

  const fetchBucket = useCallback(async () => {
    if (!bucketName) {
      navigate("/buckets");
      return;
    }

    setBucketData(await bucketServiceInstance.GetBucketByName(bucketName));
  }, [bucketName, navigate]);

  useEffect(() => {
    fetchBucket();
  }, [fetchBucket]);

  const options: ("objects" | "settings")[] = ["objects", "settings"];

  const optionComponents = {
    objects:
      bucketName && bucketData ? (
        <BucketContent
          bucketName={bucketName}
          bucketId={bucketData.id}
          fetchBucket={fetchBucket}
        />
      ) : (
        <></>
      ),
    settings:
      bucketName && bucketData ? (
        <BucketSettings bucketName={bucketName} bucketId={bucketData.id} />
      ) : (
        <></>
      ),
  };

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
              {bucketData?.versioningEnabled ? (
                <th scope="col">Versions limit</th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bucketData?.counter?.objectsCount}</td>
              <td>
                {bucketData && bucketData.counter
                  ? GetSizeString(bucketData.counter.size)
                  : 0}
              </td>
              <td>{bucketData?.versioningEnabled ? "Yes" : "No"}</td>
              {bucketData?.versioningEnabled ? (
                <td>{bucketData?.versionsLimit}</td>
              ) : (
                <></>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      <hr />
      <div className="bucket-options">
        {options.map((opt) => (
          <div
            key={opt}
            className={`option ${option === opt ? "active" : ""}`}
            onClick={() => setOptions(opt)}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </div>
        ))}
      </div>

      <hr />
      {optionComponents[option]}
    </div>
  );
}

export default Bucket;
