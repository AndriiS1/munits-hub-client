import axios from "axios";
import TokenService from "../token.service";
import { API_BASE_URL, AUTH_API_ROUTES } from "./routes";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== AUTH_API_ROUTES.LOGIN && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = TokenService.getLocalRefreshToken();

          if (refreshToken) {
            const response = await api.post(AUTH_API_ROUTES.REFRESH_TOKEN, {
              refreshToken,
            });

            const { accessToken } = response.data;
            TokenService.updateLocalAccessToken(accessToken);

            return api(originalConfig);
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      // else {
      //   TokenService.removeUserTokens();
      //   window.location.href = "/login";
      // }
    }

    return Promise.reject(err);
  }
);

export default api;
