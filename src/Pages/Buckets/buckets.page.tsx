import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/SearchInput/searchInput.component";
import bucketServiceInstance from "../../Services/Buckets/bucket.service";
import { BucketResponse } from "../../Services/Buckets/bucket.types";
import "./buckets.style.css";

function Buckets() {
  const navigate = useNavigate();

  const handleNewBucketClick = useCallback(() => {
    navigate("/buckets/new");
  }, [navigate]);

  const [loading, setLoading] = useState<boolean>(true);
  const [buckets, setBuckets] = useState<BucketResponse[]>([]);

  const fetchBuckets = useCallback(async () => {
    setBuckets(await bucketServiceInstance.GetBuckets());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  const getDataRow = (bucket: BucketResponse) => {
    return (
      <tr
        key={bucket.id}
        className="data-row"
        onClick={() => navigate(`/buckets/${bucket.name}`)}
      >
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
        <h3>MunitS object storage</h3>
        <h1>Overview</h1>
        <h3>
          High-performance storage for files and objects with zero egress
          charges.
        </h3>
        <a href="https://github.com/AndriiS1/MunitS" className="link">
          MunitS source code
        </a>
      </div>

      <div className="buckets-options">
        <SearchInput placeholder="Search for buckets" />
        <Button variant="contained" onClick={handleNewBucketClick}>
          Add bucket
        </Button>
      </div>

      <hr />
      {loading ? (
        <div className="no-buckets">Loading...</div>
      ) : !buckets || buckets.length === 0 ? (
        <div className="no-buckets">
          You have no buckets created. Add one to start working with.
        </div>
      ) : (
        <div className="table-container">
          <table className="buckets-table">
            <thead>
              <tr>
                <th scope="col">Buckets</th>
                <th scope="col">Objects</th>
                <th scope="col">Size</th>
              </tr>
            </thead>
            <tbody>{buckets.map((bucket) => getDataRow(bucket))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Buckets;
