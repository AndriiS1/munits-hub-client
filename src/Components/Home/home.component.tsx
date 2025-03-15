import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { JSX } from "react";
import { BucketResponse } from "../../Services/Bucket/bucket.types";
import "./home.style.css";

export default function Home() {
  const rows: BucketResponse[] = [
    {
      id: "1",
      name: "Bucket 1",
      versioningEnabled: true,
      versionsLimit: 10,
      size: 100,
      objectsCount: 10,
    },
  ];

  const getDataRow = (bucket: BucketResponse): JSX.Element => {
    return (
      <TableRow
        key={bucket.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {bucket.name}
        </TableCell>
        <TableCell align="right">{bucket.objectsCount}</TableCell>
        <TableCell align="right">{bucket.size}</TableCell>
      </TableRow>
    );
  };

  return (
    <div className="buckets-table-wrap">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Buckets</TableCell>
              <TableCell align="right">Objects</TableCell>
              <TableCell align="right">Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows.map((row) => getDataRow(row))}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
