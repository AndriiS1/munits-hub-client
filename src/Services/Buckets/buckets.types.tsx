export interface BucketResponse {
  id: string;
  name: string;
  versioningEnabled: boolean;
  versionsLimit: number;
  counter?: BucketCounterResponse;
}

interface BucketCounterResponse {
  size: number;
  objectsCount: number;
}
