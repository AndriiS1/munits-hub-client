export const API_BASE_URL = process.env.REACT_APP_MUNITS_SERVER_URL || "";

export const AUTH_API_ROUTES = {
  LOGIN: `users/login`,
  SIGN_UP: `users/sign-up`,
  REFRESH_TOKEN: `users/refresh-token`,
};
