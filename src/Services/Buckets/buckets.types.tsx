export interface BucketResponse {
  id: string;
  name: string;
  versioningEnabled: boolean;
  versionsLimit: number;
  size: number;
  objectsCount: number;
}
