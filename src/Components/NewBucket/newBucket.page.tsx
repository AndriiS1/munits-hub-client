import { Link } from "react-router-dom";
import "./newBucket.style.css";

export default function NewBucketPage() {
  return (
    <div className="new-bucket-data">
      <Link className="router-link text-base" to="/buckets">
        ⬅ MunitS
      </Link>
      <h1>Create a bucket</h1>
      <span>
        Get started by creating a new empty bucket. You'll be able to add data
        to your bucket using the dashboard
      </span>
      <hr />
      <h3>Location</h3>
    </div>
  );
}
