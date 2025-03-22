import api from "../api/api";
import { BUCKETS_API_ROUTES } from "../api/routes";
import { BucketResponse } from "./bucket.types";

class BucketService {
  async GetBuckets(): Promise<BucketResponse[]> {
    const response = await api.post(BUCKETS_API_ROUTES.GET_USER_BUCKETS, {});

    return response.data;
  }

  async BucketExistsCheck(name: string): Promise<boolean> {
    const response = await api.post(BUCKETS_API_ROUTES.EXISTS, { name });
    return response.data.exists;
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
