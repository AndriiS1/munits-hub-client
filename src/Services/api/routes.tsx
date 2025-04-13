export const API_BASE_URL = process.env.REACT_APP_MUNITS_HUB_SERVER_URL || "";

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
  DELETE: `buckets/`,
  CREATE: `buckets/`,
  EXISTS: `buckets/exists`,
};

export const MUNITS_HUB_ROUTES = {
  FILTER_OBJECTS: `objects/filter`,
  INITIATE_UPLOAD: `objects/upload/initiate`,

  COMPLETE_UPLOAD: (uploadId: string) => `objects/upload/${uploadId}/complete`,

  ABORT_UPLOAD: (uploadId: string) => `objects/upload/${uploadId}abort/`,

  GET_UPLOAD_SIGNED_URLS: (
    uploadId: string,
    bucketId: string,
    fileSize: number
  ) =>
    `objects/upload/${uploadId}/signed-urls?bucketId=${bucketId}&fileSize=${fileSize}`,
};
