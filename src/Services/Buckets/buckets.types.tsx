export interface BucketResponse {
  id: string;
  name: string;
  versioningEnabled: boolean;
  versionsLimit: number;
  createdAt: string;
  counter?: BucketCounterResponse;
}

export interface BucketCounterResponse {
  size: number;
  objectsCount: number;
  typeAOperationsCount: number;
  typeBOperationsCount: number;
}

export interface MetricResponse {
  date: string;
  typeAOperationsCount: number;
  typeBOperationsCount: number;
}

export interface MetricsResponse {
  metrics: MetricResponse[];
}
