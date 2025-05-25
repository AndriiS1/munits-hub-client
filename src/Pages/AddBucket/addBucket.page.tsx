import localizationService from "@/Localization/localization.service";
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
      setBucketNameErrorMessage(
        localizationService.translate("maximum_bucket_name")
      );
    } else if (!bucketNameRegex.test(bucketName)) {
      setBucketNameErrorMessage(
        localizationService.translate("invalid_bucket_name")
      );
    } else if (bucketName) {
      const checkBucketExists = async () => {
        const bucketExists = await bucketServiceInstance.BucketExistsCheck(
          bucketName
        );
        if (bucketExists) {
          setBucketNameErrorMessage(
            localizationService.translate("bucket_with_name_exists")
          );
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
      <h1>{localizationService.translate("create_a_bucket")}</h1>
      <h3>
        {localizationService.translate("get_started_by_creating_new_bucket")}
      </h3>

      <Input
        type="text"
        errorMessage={bucketNameErrorMessage}
        topPlaceholder={localizationService.translate("bucket_name")}
        bottomPlaceholder={localizationService.translate(
          "bucket_name_is_permanent"
        )}
        value={bucketName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBucketName(e.target.value.toLowerCase())
        }
      />
      <hr />
      <h2>{localizationService.translate("location")}</h2>
      <SelectList
        selectedValue={locationOption}
        onChange={handleLocationSelectionChange}
        options={[
          {
            title: `${localizationService.translate("default")}`,
            value: LocationOptions.DEFAULT,
            content: `${localizationService.translate("we_have_chosen")}`,
          },
        ]}
      />
      <h2>{localizationService.translate("versioning")}</h2>
      <SelectList
        selectedValue={versioningOption}
        onChange={handleVersioningSelectionChange}
        options={[
          {
            title: `${localizationService.translate("not_versioned_bucket")}`,
            value: VersioningOptions.NO_VERSIONING,
            content: `${localizationService.translate("only_one_version")}`,
          },
          {
            title: `${localizationService.translate("versioning_enabled")}`,
            value: VersioningOptions.VERSIONING_ENABLED,
            content: `${localizationService.translate(
              "each_object_has_fixed"
            )}`,
            childPlaceholder: `${localizationService.translate(
              "number_of_versions"
            )}`,
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
          {localizationService.translate(
            "by_default_buckets_are_not_publicly_accessible"
          )}
        </span>
        <div className="create-bucket-buttons">
          <Button onClick={() => navigate("/buckets")}>
            {localizationService.translate("cancel")}
          </Button>
          <Button onClick={handleCreateBucket} disabled={!creationDataIsValid}>
            {localizationService.translate("create")}
          </Button>
        </div>
      </div>
    </div>
  );
}
