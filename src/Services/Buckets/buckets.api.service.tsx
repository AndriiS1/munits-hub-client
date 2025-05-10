import api from "../api/api";
import { BUCKETS_API_ROUTES } from "../api/routes";
import type { BucketResponse } from "./buckets.types";

class BucketService {
  async GetBuckets(): Promise<BucketResponse[]> {
    const response = await api.post(BUCKETS_API_ROUTES.GET_BUCKETS, {
      page: 1,
      pageSize: 100,
    });

    return response.data as BucketResponse[];
  }

  async SearchBuckets(search: string): Promise<BucketResponse[]> {
    const response = await api.post(BUCKETS_API_ROUTES.SEARCH_BUCKETS, {
      search: search,
      page: 1,
      pageSize: 100,
    });

    return response.data as BucketResponse[];
  }

  async GetBucketByName(name: string): Promise<BucketResponse> {
    const response = await api.get(BUCKETS_API_ROUTES.GET_BUCKET_BY_NAME(name));

    return response.data as BucketResponse;
  }

  async Delete(bucketId: string): Promise<BucketResponse> {
    const response = await api.delete(BUCKETS_API_ROUTES.DELETE(bucketId));

    return response.data as BucketResponse;
  }

  async BucketExistsCheck(name: string): Promise<boolean> {
    const response = await api.post(BUCKETS_API_ROUTES.EXISTS, { name });
    return (response.data as { exists: boolean }).exists;
  }

  async CreateBucket(
    name: string,
    versioningEnabled: boolean,
    versionsLimit: number
  ) {
    return api.post(BUCKETS_API_ROUTES.CREATE, {
      name,
      versioningEnabled,
      versionsLimit,
    });
  }
}

const bucketServiceInstance = new BucketService();
export default bucketServiceInstance;
