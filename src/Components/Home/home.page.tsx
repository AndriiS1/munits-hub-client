import { Button } from "@mui/material";
import { JSX, useState } from "react";
import { BucketResponse } from "../../Services/Buckets/bucket.types";
import SearchInput from "../SearchInput/searchInput.component";
import "./home.style.css";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string>("admin@gmail.com");

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

  const getDataRow = (bucket: BucketResponse): JSX.Element => {
    return (
      <tr
        key={bucket.id}
        className="border-b border-gray-200 dark:border-gray-700"
      >
        <th
          scope="row"
          className="text-[rgb(18,18,228)] underline underline hover:cursor-pointer
          px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          {bucket.name}
        </th>
        <td className="px-6 py-4">{bucket.objectsCount}</td>
        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{bucket.size}</td>
      </tr>
    );
  };

  return (
    <div>
      <header>
        <ul className="nav">
          <li className="logo-text">MunitS</li>
          <li>Log out</li>
        </ul>
      </header>

      <div className="home-container">
        <div className="side-bar">
          <div className="user-email">{userEmail}</div>
          <ul>
            <li className="">Dashboard</li>
            <li className="">Analytics</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className="buckets-container">
          <div className="buckets-data">
            <div className="space-y-3">
              <h3 className="heading">MunitS object storage</h3>
              <h1 className="title">Overview</h1>
              <h3 className="heading">
                High-performance storage for files and objects with zero egress
                charges.
              </h3>
              <a href="https://github.com/AndriiS1/MunitS" className="link">
                MunitS source code
              </a>
            </div>

            <div className="buckets-options">
              <SearchInput placeholder="Search for buckets" />
              <Button variant="contained" disableElevation>
                Add bucket
              </Button>
            </div>

            <div className="table-container">
              <table className="table">
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
        </div>
        <footer className="home-footer"></footer>
      </div>
    </div>
  );
}
