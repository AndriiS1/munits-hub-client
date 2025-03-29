import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BucketFolder from "../../Components/BucketContent/bucketContent.component";
import SearchInput from "../../Components/SearchInput/searchInput.component";
import bucketServiceInstance from "../../Services/Buckets/bucket.service";
import { BucketResponse } from "../../Services/Buckets/bucket.types";
import "./bucket.style.css";

function Bucket() {
  const { bucketName } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [path, setPath] = useState<string>("/");
  const [bucketData, setBucketData] = useState<BucketResponse>();

  const fetchBucket = useCallback(async () => {
    if (!bucketName) {
      navigate("/buckets");
      return;
    }

    setBucketData(await bucketServiceInstance.GetBucketByName(bucketName));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBucket();
  }, [fetchBucket]);

  useEffect(() => {
    // const getBuckets = async () => {
    //   setBuckets(await bucketServiceInstance.GetBuckets());
    // };

    // getBuckets();
    setLoading(false);
  }, []);

  const getDataRow = (bucket: BucketResponse) => {
    return (
      <tr key={bucket.id} className="data-row">
        <th scope="row" className="data-header">
          <span>{bucket.name}</span>
        </th>
        <td className="data-cell">{bucket.objectsCount}</td>
        <td className="data-cell-alt">{bucket.size}</td>
      </tr>
    );
  };

  return (
    <div className="buckets-data">
      <div>
        <Link to="/buckets" className="link">
          MunitS / {bucketName}
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bucketData?.objectsCount}</td>
              <td>{bucketData?.size}</td>
              <td>{bucketData?.versioningEnabled}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="buckets-options">
        <SearchInput placeholder="Search for buckets" />
      </div>

      <hr />
      <BucketFolder bucketId={bucketData?.id}></BucketFolder>
    </div>
  );
}

export default Bucket;
