import type { BucketResponse } from "@/Services/Buckets/buckets.types";
import { BucketChart } from "./Chart/bucketChart.component";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import bucketServiceInstance from "@/Services/Buckets/buckets.api.service";
import { useCallback, useEffect, useState } from "react";

export function Metrics() {
  const [buckets, setBuckets] = useState<BucketResponse[]>([]);

  const fetchBuckets = useCallback(async () => {
    setBuckets(await bucketServiceInstance.GetBuckets());
  }, []);

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  function BucketSelect() {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a bucket" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Buckets</SelectLabel>
            {buckets.map((bucket) => (
              <SelectItem value={bucket.name}>{bucket.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <div>
      <BucketSelect />

      <div className="metrics-wrapper">
        <BucketChart />
      </div>
    </div>
  );
}
