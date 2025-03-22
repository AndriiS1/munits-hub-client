export const API_BASE_URL = process.env.REACT_APP_MUNITS_SERVER_URL || "";

export const AUTH_API_ROUTES = {
  GET_USER_EMAIL: `users/email`,
  LOGIN: `users/login`,
  SIGN_UP: `users/sign-up`,
  REFRESH_TOKEN: `users/refresh-token`,
};

export const BUCKETS_API_ROUTES = {
  GET_BUCKET: `buckets/{id}`,
  GET_USER_BUCKETS: `buckets/user`,
  DELETE: `buckets/`,
  CREATE: `buckets/`,
  EXISTS: `buckets/exists`,
};
