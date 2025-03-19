import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../Components/SearchInput/searchInput.component";
import { BucketResponse } from "../../Services/Buckets/bucket.types";
import "./buckets.style.css";

export default function Buckets() {
  const navigate = useNavigate();

  const rows: BucketResponse[] = [
    {
      id: "1",
      name: "Bucket 1",
      versioningEnabled: true,
      versionsLimit: 10,
      size: 100,
      objectsCount: 10,
    },
    {
      id: "2",
      name: "Bucket 1",
      versioningEnabled: true,
      versionsLimit: 10,
      size: 100,
      objectsCount: 10,
    },
    {
      id: "3",
      name: "Bucket 1",
      versioningEnabled: true,
      versionsLimit: 10,
      size: 100,
      objectsCount: 10,
    },
  ];
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
        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            navigate("/buckets/new");
          }}
        >
          Add bucket
        </Button>
      </div>

      <div className="table-container">
        <table className="buckets-table">
          <thead>
            <tr>
              <th scope="col">Buckets</th>
              <th scope="col">Objects</th>
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>{rows.map((bucket) => getDataRow(bucket))}</tbody>
        </table>
      </div>
    </div>
  );
}
