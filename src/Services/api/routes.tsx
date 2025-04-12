export const API_BASE_URL = process.env.MUNITS_HUB_SERVER_URL || "";

export const AUTH_API_ROUTES = {
  GET_USER_EMAIL: `users/email`,
  LOGIN: `users/login`,
  SIGN_UP: `users/sign-up`,
  REFRESH_TOKEN: `users/refresh-token`,
};

export const BUCKETS_API_ROUTES = {
  GET_BUCKET: `buckets/{id}`,
  GET_USER_BUCKETS: `buckets/user`,
  GET_BUCKET_BY_NAME: `buckets/by-name`,
  DELETE: `buckets/`,
  CREATE: `buckets/`,
  EXISTS: `buckets/exists`,
};

export const MUNITS_HUB_ROUTES = {
  FILTER_OBJECTS: `objects/filter`,
  INITIATE_UPLOAD: `objects/upload/initiate`,

  COMPLETE_UPLOAD: (uploadId: string) => `objects/upload/${uploadId}/abort`,

  ABORT_UPLOAD: (uploadId: string) => `objects/upload/${uploadId}/complete`,

  GET_UPLOAD_SIGNED_URLS: (
    uploadId: string,
    bucketId: string,
    fileSize: number
  ) =>
    `objects/upload/${uploadId}/signed-urls?bucketId=${bucketId}&fileSize=${fileSize}`,
};
