import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../Components/Input/input.component";
import SelectList from "../../Components/SelectList/selectList.component";
import "./addBucket.style.css";

enum LocationOptions {
  DEFAULT = "default",
}

enum VersioningOptions {
  NO_VERSIONING = "none",
  VERSIONING_ENABLED = "enabled",
}

export default function AddBucketPage() {
  const [bucketName, setBucketName] = useState<string>("");
  const [bucketNameErrorMessage, setBucketNameErrorMessage] = useState<
    string | undefined
  >();

  const [locationOption, setLocationOption] = useState<LocationOptions>(
    LocationOptions.DEFAULT
  );
  const [versioningOption, setVersioningOption] = useState<VersioningOptions>(
    VersioningOptions.NO_VERSIONING
  );

  const [versionsCount, setVersionsCount] = useState<number | null>(null);

  const handleLocationSelectionChange = (value: LocationOptions) => {
    setLocationOption(value);
  };

  const handleVersioningSelectionChange = (value: VersioningOptions) => {
    setVersioningOption(value);
  };

  const handleVersionCountChange = (value: number) => {
    setVersionsCount(value);
  };

  useEffect(() => {
    const bucketNameRegex = /^$|^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9-]+)*$/;

    if (!bucketNameRegex.test(bucketName)) {
      setBucketNameErrorMessage("Invalid bucket name.");
    } else {
      setBucketNameErrorMessage(undefined);
    }
  }, [bucketName]);

  return (
    <div className="new-bucket-data">
      <Link className="router-link text-base" to="/buckets">
        ⬅ MunitS
      </Link>
      <h1>Create a bucket</h1>
      <h3>
        Get started by creating a new empty bucket. You'll be able to add data
        to your bucket using the dashboard
      </h3>

      <Input
        type="text"
        errorMessage={bucketNameErrorMessage}
        topPlaceholder="Bucket name"
        bottomPlaceholder="Bucket name is permanent and unchangeable."
        value={bucketName}
        onChange={(e: any) => setBucketName(e.target.value)}
      />
      <hr />
      <h2>Location</h2>
      <SelectList
        selectedValue={locationOption}
        onChange={handleLocationSelectionChange}
        options={[
          {
            title: "Default",
            value: LocationOptions.DEFAULT,
            content:
              "We have chosen to place your bucket in Eastern Europe. Provide a location hint, if you would like to use a different location.",
          },
        ]}
      />
      <h2>Location</h2>
      <SelectList
        selectedValue={versioningOption}
        onChange={handleVersioningSelectionChange}
        options={[
          {
            title: "Not versioned bucket",
            value: VersioningOptions.NO_VERSIONING,
            content:
              "Only one version of each object is stored. When you overwrite an object, the previous version is lost.",
          },
          {
            title: "Versioning enabled",
            value: VersioningOptions.VERSIONING_ENABLED,
            content: "Each object has fixed number of versions.",
            placeholder: "Number of versions",
            inputValue: versionsCount,
          },
        ]}
      />

      <hr />

      <div>
        <span>
          By default buckets are not publicly accessible. You can access objects
          stored within your bucket by binding the bucket to a Worker or using
          the API. Bucket access can be changed to Public at any time.
        </span>
        <div>
          <Button>Cancel</Button>
          <Button>Create</Button>
        </div>
      </div>
    </div>
  );
}
