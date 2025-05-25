import localizationService from "@/Localization/localization.service";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/button.component";
import SearchInput from "../../Components/SearchInput/searchInput.component";
import bucketServiceInstance from "../../Services/Buckets/buckets.api.service";
import type { BucketResponse } from "../../Services/Buckets/buckets.types";
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
  }, [fetchBuckets, search, searchBuckets]);

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
        <h3>{localizationService.translate("munits_object_storage")}</h3>
        <h1>{localizationService.translate("overview")}</h1>
        <h3>{localizationService.translate("high_performance_storage")}</h3>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/AndriiS1/MunitS"
          className="link"
        >
          {localizationService.translate("munits_source_code")}
        </a>
      </div>

      <div className="buckets-options">
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchChange(e)
          }
          value={search ?? ""}
          placeholder={localizationService.translate("search_buckets")}
        />
        <div className="add-bucket-button">
          <Button onClick={handleNewBucketClick}>
            {localizationService.translate("add_bucket")}
          </Button>
        </div>
      </div>

      <hr />
      {loading ? (
        <div className="no-buckets">
          {localizationService.translate("loading")}...
        </div>
      ) : !buckets || buckets.length === 0 ? (
        <div className="no-buckets">
          {localizationService.translate("you_have_no_buckets_created")}
        </div>
      ) : (
        <div className="table-container">
          <table className="buckets-table">
            <thead>
              <tr>
                <th scope="col">{localizationService.translate("buckets")}</th>
                <th scope="col">{localizationService.translate("objects")}</th>
                <th scope="col">{localizationService.translate("size")}</th>
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
