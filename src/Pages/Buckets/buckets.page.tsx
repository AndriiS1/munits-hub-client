import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/button.component";
import SearchInput from "../../Components/SearchInput/searchInput.component";
import bucketServiceInstance from "../../Services/Buckets/buckets.api.service";
import { BucketResponse } from "../../Services/Buckets/buckets.types";
import { GetSizeString } from "../../Utils/fileSize.util";
import "./buckets.style.css";

function Buckets() {
  const navigate = useNavigate();

  const handleNewBucketClick = useCallback(() => {
    navigate("/buckets/new");
  }, [navigate]);

  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string | undefined>();
  const [buckets, setBuckets] = useState<BucketResponse[]>([]);

  const fetchBuckets = useCallback(async () => {
    setBuckets(await bucketServiceInstance.GetBuckets());
    setLoading(false);
  }, []);

  const searchBuckets = useCallback(async () => {
    if (search && search.length > 0) {
      setLoading(true);
      setBuckets(await bucketServiceInstance.SearchBuckets(search));
      setLoading(false);
    }
  }, [search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  useEffect(() => {
    if (search && search.length > 0) {
      searchBuckets();
    } else {
      fetchBuckets();
    }
  }, [fetchBuckets, search]);

  const getDataRow = (bucket: BucketResponse) => {
    return (
      <tr
        key={bucket.id}
        className="data-row"
        onClick={() => navigate(`/buckets/${bucket.name}`)}
      >
        <th scope="row">
          <span className="custom-link">{bucket.name}</span>
        </th>
        <td>{bucket.counter ? bucket.counter.objectsCount : 0}</td>
        <td>{bucket.counter ? GetSizeString(bucket.counter.size) : 0}</td>
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
        <SearchInput
          onChange={(e: any) => handleSearchChange(e)}
          value={search ?? ""}
          placeholder="Search for buckets"
        />
        <div className="add-bucket-button">
          <Button onClick={handleNewBucketClick}>Add bucket</Button>
        </div>
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
