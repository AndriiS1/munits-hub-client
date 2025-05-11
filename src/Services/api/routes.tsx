// Ensure TypeScript knows about the VITE_MUNITS_HUB_SERVER_URL env variable
export const API_BASE_URL = import.meta.env.VITE_MUNITS_HUB_SERVER_URL || "";

export const AUTH_API_ROUTES = {
  GET_USER_EMAIL: `users/email`,
  LOGIN: `users/login`,
  SIGN_UP: `users/sign-up`,
  REFRESH_TOKEN: `users/refresh-token`,
};

export const BUCKETS_API_ROUTES = {
  GET_BUCKET: (bucketId: string) => `buckets/${bucketId}`,
  GET_BUCKETS: `buckets/filter`,
  SEARCH_BUCKETS: `buckets/search`,
  GET_BUCKET_BY_NAME: (bucketName: string) => `buckets/by-name/${bucketName}`,
  DELETE: (bucketId: string) => `buckets/${bucketId}`,
  CREATE: `buckets/`,
  EXISTS: `buckets/exists`,
  GET_METRICS: (bucketId: string) => `buckets/${bucketId}/metrics`,
};

export const MUNITS_HUB_ROUTES = {
  FILTER_OBJECTS: (bucketId: string) => `buckets/${bucketId}/objects/filter`,
  INITIATE_UPLOAD: (bucketId: string) =>
    `buckets/${bucketId}/objects/uploads/initiate`,

  DELETE: (bucketId: string, fileKey: string, uploadId?: string) =>
    uploadId
      ? `buckets/${bucketId}/objects/${fileKey}?uploadId=${uploadId}`
      : `buckets/${bucketId}/objects/${fileKey}`,

  GET_OBJECT: (bucketName: string, objectId: string) =>
    `buckets/${bucketName}/objects/${objectId}`,

  COMPLETE_UPLOAD: (bucketId: string, objectId: string, uploadId: string) =>
    `buckets/${bucketId}/objects/${objectId}/uploads/${uploadId}/complete`,

  ABORT_UPLOAD: (bucketId: string, objectId: string, uploadId: string) =>
    `buckets/${bucketId}/objects/${objectId}/uploads/${uploadId}/abort`,

  GET_UPLOAD_SIGNED_URLS: (
    bucketId: string,
    objectId: string,
    uploadId: string,
    fileSize: number
  ) =>
    `buckets/${bucketId}/objects/${objectId}/uploads/${uploadId}/signed-urls?&fileSize=${fileSize}`,
};
