import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/button.component";
import Input from "../../Components/Input/input.component";
import SelectList from "../../Components/SelectList/selectList.component";
import bucketServiceInstance from "../../Services/Buckets/buckets.api.service";
import "./addBucket.style.css";

const LocationOptions = {
  DEFAULT: "default",
} as const;
type LocationOptions = (typeof LocationOptions)[keyof typeof LocationOptions];

const VersioningOptions = {
  NO_VERSIONING: "none",
  VERSIONING_ENABLED: "enabled",
} as const;
type VersioningOptions =
  (typeof VersioningOptions)[keyof typeof VersioningOptions];

export default function AddBucketPage() {
  const navigate = useNavigate();
  const [bucketName, setBucketName] = useState<string>("");
  const [bucketNameErrorMessage, setBucketNameErrorMessage] = useState<
    string | undefined
  >();
  const [versionLimitErrorMessage, setVersionLimitErrorMessage] = useState<
    string | undefined
  >();
  const [locationOption, setLocationOption] = useState<LocationOptions>(
    LocationOptions.DEFAULT
  );
  const [versioningOption, setVersioningOption] = useState<VersioningOptions>(
    VersioningOptions.NO_VERSIONING
  );
  const [versionsCount, setVersionsCount] = useState<number | null>(null);
  const [creationDataIsValid, setCreationDataIsValid] =
    useState<boolean>(false);

  const handleLocationSelectionChange = (value: unknown) => {
    setLocationOption(value as LocationOptions);
  };

  const handleVersioningSelectionChange = (value: unknown) => {
    setVersioningOption(value as VersioningOptions);
  };

  const handleVersionCountChange = (value: number | null) => {
    setVersionsCount(value);
  };

  const handleCreateBucket = async () => {
    if (versioningOption === VersioningOptions.NO_VERSIONING) {
      await bucketServiceInstance.CreateBucket(bucketName, false, 1);
    } else if (
      versioningOption === VersioningOptions.VERSIONING_ENABLED &&
      versionsCount
    ) {
      await bucketServiceInstance.CreateBucket(bucketName, true, versionsCount);
    }

    navigate("/buckets");
  };

  useEffect(() => {
    const bucketNameRegex = /^$|^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9-]+)*$/;
    const maxBucketNameLength = 63;
    const minimumBucketName = 3;
    const versionsLimit = 1000;
    const minimumVersionLimit = 1;

    if (bucketName.length > maxBucketNameLength) {
      setBucketNameErrorMessage("Maximum bucket name is 63 symbols.");
    } else if (!bucketNameRegex.test(bucketName)) {
      setBucketNameErrorMessage("Invalid bucket name.");
    } else if (bucketName) {
      const checkBucketExists = async () => {
        const bucketExists = await bucketServiceInstance.BucketExistsCheck(
          bucketName
        );
        if (bucketExists) {
          setBucketNameErrorMessage("Bucket with this name already exists.");
        } else {
          setBucketNameErrorMessage(undefined);
        }
      };
      checkBucketExists();
    } else {
      setBucketNameErrorMessage(undefined);
    }

    if (versioningOption === VersioningOptions.VERSIONING_ENABLED) {
      if (!versionsCount) {
        setVersionLimitErrorMessage(undefined);
      } else if (versionsCount > versionsLimit) {
        setVersionLimitErrorMessage(`Versioning limit is ${versionsLimit}`);
        return;
      } else {
        setVersionLimitErrorMessage(undefined);
      }
    } else {
      setVersionLimitErrorMessage(undefined);
    }

    setCreationDataIsValid(
      !bucketNameErrorMessage &&
        !versionLimitErrorMessage &&
        bucketName.length > minimumBucketName &&
        (versioningOption === VersioningOptions.NO_VERSIONING ||
          (!!versionsCount && versionsCount > minimumVersionLimit))
    );
  }, [
    bucketName,
    bucketNameErrorMessage,
    versionLimitErrorMessage,
    versioningOption,
    versionsCount,
  ]);

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBucketName(e.target.value.toLowerCase())
        }
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
            childPlaceholder: "Number of versions",
            childInputValue: versionsCount,
            onChildInputChange: (e) =>
              handleVersionCountChange(Number(e.target.value)),
            childErrorMessage: versionLimitErrorMessage,
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
        <div className="create-bucket-buttons">
          <Button onClick={() => navigate("/buckets")}>Cancel</Button>
          <Button onClick={handleCreateBucket} disabled={!creationDataIsValid}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
