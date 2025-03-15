import api from "../api/api";
import { BUCKETS_API_ROUTES } from "../api/routes";
import { BucketResponse } from "./bucket.types";

class BucketService {
  async GetBuckets(): Promise<BucketResponse[]> {
    const response = await api.post(BUCKETS_API_ROUTES.GET_BUCKETS, {});

    return response.data;
  }
}

const authServiceInstance = new BucketService();
export default authServiceInstance;
