import type { BucketResponse } from "@/Services/Buckets/buckets.types";
import { BucketChart } from "./Chart/bucketChart.component";
import "./metrics.style.css";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import localizationService from "@/Localization/localization.service";
import bucketServiceInstance from "@/Services/Buckets/buckets.api.service";
import { useCallback, useEffect, useState } from "react";

export function Metrics() {
  const [buckets, setBuckets] = useState<BucketResponse[]>([]);
  const [bucketData, setBucketData] = useState<BucketResponse | undefined>(
    undefined
  );

  const fetchBuckets = useCallback(async () => {
    setBuckets(await bucketServiceInstance.GetBuckets());
  }, []);

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  useEffect(() => {}, [bucketData]);

  function BucketSelect() {
    return (
      <Select
        value={bucketData?.name}
        onValueChange={(value) => {
          const selected = buckets.find((bucket) => bucket.name === value);
          setBucketData(selected);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={localizationService.translate("select_a_bucket")}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {localizationService.translate("buckets")}
            </SelectLabel>
            {buckets.map((bucket) => (
              <SelectItem key={bucket.id} value={bucket.name}>
                {bucket.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <div>
      <div>
        <BucketSelect />
      </div>
      {bucketData != undefined ? (
        <div className="metrics-wrapper">
          <BucketChart bucketId={bucketData.id} />
        </div>
      ) : (
        <div className="no-bucket-content">
          {localizationService.translate("select_buckets_to_see_charts")}
        </div>
      )}
    </div>
  );
}
